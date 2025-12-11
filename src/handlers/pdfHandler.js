import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Cria a página de sumário com links clicáveis para cada receita.
 * Cada item aponta para a página correspondente (sumário = pág 1, receitas começam na 2).
 */
const addSummaryPage = (pdf, recipes) => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let y = 30;

  // Título do sumário
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(237, 79, 39);
  pdf.text("Sumário", margin, y);
  y += 12;

  // Subtítulo
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(80, 80, 80);
  pdf.text("Uma receita por página", margin, y);
  y += 12;

  // Lista
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);

  recipes.forEach((recipe, idx) => {
    const pageNumber = idx + 2; // página destino
    const text = `${idx + 1}. ${recipe.title || "Sem título"}`;

    // Quebra de página do sumário se necessário
    if (y > pageHeight - 20) {
      pdf.addPage();
      y = 30;
    }

    // Renderiza o título
    const maxWidth = pageWidth - margin * 2 - 25;
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, margin, y);

    // Número da página à direita
    pdf.text(String(pageNumber), pageWidth - margin, y, { align: "right" });

    // Cria área clicável (link interno) no retângulo do texto
    // Observação: jsPDF possui 'link' para criar anotação com ação GoTo página
    const lineHeight = 6;
    const height = lineHeight * lines.length;
    const width = pageWidth - margin * 2;
    pdf.link(margin, y - 4, width, height, { pageNumber });

    y += 8 + (lines.length - 1) * lineHeight;
  });
};

/**
 * Remove a primeira linha de título Markdown (# ...) do conteúdo
 * para evitar duplicidade com o título renderizado acima.
 */
const stripLeadingMarkdownTitle = (markdown) => {
  if (!markdown) return "";
  const lines = markdown.split("\n");
  if (lines.length === 0) return markdown;
  // Se a primeira linha começa com "#" (h1/h2/h3)
  if (/^\s*#{1,6}\s+/.test(lines[0])) {
    return lines.slice(1).join("\n").trim();
  }
  return markdown;
};

// Exporta PDF com sumário e abre em nova aba
export const exportRecipesToPDF = async (recipes, onProgress) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Sumário (primeira página)
  addSummaryPage(pdf, recipes);

  // Adiciona número de página no rodapé da página de sumário
  addPageNumber(pdf, 1);

  if (onProgress)
    onProgress({ step: "summary", current: 0, total: recipes.length });

  // Para cada receita, nova página
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Adiciona nova página (cada receita tem sua página)
    pdf.addPage();

    // Número da página atual (sumário é 1, receitas começam em 2)
    const currentPageNumber = i + 2;

    // Elemento temporário para render
    const tempDiv = document.createElement("div");
    tempDiv.style.width = "794px"; // ~A4 px a 96dpi, ajuda a evitar esticamento
    tempDiv.style.padding = "24px";
    tempDiv.style.boxSizing = "border-box";
    tempDiv.style.backgroundColor = "#ffffff";
    tempDiv.style.fontFamily = "Arial, sans-serif";
    tempDiv.style.lineHeight = "1.5";

    // Conteúdo sem título duplicado
    const content = stripLeadingMarkdownTitle(
      recipe.content || recipe.description || ""
    );

    tempDiv.innerHTML = `
      <div style="margin-bottom: 8px;">
        <h1 style="color: #ed4f27ff; font-size: 24px; margin: 0 0 8px 0;">
          ${recipe.title || "Sem título"}
        </h1>
        ${
          recipe.font
            ? `<p style="color: #666; font-size: 12px; margin: 0;">Fonte: ${recipe.font}</p>`
            : ""
        }
        ${
          recipe.link
            ? `<p style="margin: 4px 0 0 0; font-size: 12px;">
                <a href="${recipe.link}" style="color:#1a73e8; text-decoration: underline;" target="_blank" rel="noopener noreferrer">
                  Ver receita original
                </a>
              </p>`
            : ""
        }
      </div>
      <div style="margin-top: 12px; font-size: 14px;">
        ${formatMarkdownToHTML(content)}
      </div>
    `;

    document.body.appendChild(tempDiv);

    // html2canvas com escala controlada para evitar esticar
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    document.body.removeChild(tempDiv);

    // Adicionar imagem no PDF com margens
    const imgData = canvas.toDataURL("image/png");
    const marginMm = 10;
    const contentWidthMm = pageWidth - marginMm * 2;
    const imgHeightMm = (canvas.height * contentWidthMm) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      marginMm,
      marginMm,
      contentWidthMm,
      Math.min(imgHeightMm, pageHeight - marginMm * 2)
    );

    // Adiciona número de página no rodapé
    addPageNumber(pdf, currentPageNumber);

    if (onProgress)
      onProgress({ step: "page", current: i + 1, total: recipes.length });
  }

  // Abrir em nova aba
  const blob = pdf.output("blob");
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
};

/**
 * Adiciona número de página no rodapé (footer)
 */
const addPageNumber = (pdf, pageNumber) => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(150, 150, 150);

  // Centralizado no rodapé
  pdf.text(String(pageNumber), pageWidth / 2, pageHeight - 8, {
    align: "center",
  });
};

// Função auxiliar para converter Markdown básico em HTML
const formatMarkdownToHTML = (markdown) => {
  return markdown
    .replace(
      /^### (.*$)/gim,
      '<h3 style="color: #ed4f27ff; margin-top: 15px;">$1</h3>'
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 style="color: #ed4f27ff; margin-top: 20px;">$1</h2>'
    )
    .replace(/^# (.*$)/gim, "") // remove h1 para evitar duplicidade
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ed4f27ff;">$1</strong>')
    .replace(/^\* (.*$)/gim, "<li>$1</li>")
    .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>");
};
