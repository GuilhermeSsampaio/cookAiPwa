import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportRecipesToPDF = async (recipes) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Criar elemento temporário para renderizar a receita
    const tempDiv = document.createElement("div");
    tempDiv.style.width = "210mm"; // A4 width
    tempDiv.style.padding = "20px";
    tempDiv.style.backgroundColor = "white";
    tempDiv.style.fontFamily = "Arial, sans-serif";

    tempDiv.innerHTML = `
      <div style="margin-bottom: 20px;">
        <h1 style="color: #ed4f27ff; font-size: 24px; margin-bottom: 10px;">
          ${recipe.title}
        </h1>
        ${
          recipe.font
            ? `<p style="color: #666; font-size: 14px;">Fonte: ${recipe.font}</p>`
            : ""
        }
        <div style="margin-top: 15px; font-size: 14px; line-height: 1.6;">
          ${formatMarkdownToHTML(recipe.content)}
        </div>
      </div>
    `;

    document.body.appendChild(tempDiv);

    // Converter para canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Remover elemento temporário
    document.body.removeChild(tempDiv);

    // Adicionar ao PDF
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pageWidth - 20; // margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(
      imgData,
      "PNG",
      10,
      10,
      imgWidth,
      Math.min(imgHeight, pageHeight - 20)
    );
  }

  // Salvar PDF
  pdf.save("minhas-receitas.pdf");
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
    .replace(/^# (.*$)/gim, '<h1 style="color: #ed4f27ff;">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ed4f27ff;">$1</strong>')
    .replace(/^\* (.*$)/gim, "<li>$1</li>")
    .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>");
};
