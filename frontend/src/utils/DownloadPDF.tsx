import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const downloadPdf = ({ pdfname }: { pdfname: string }) => {
  const input = document.getElementById("billPage");
  if (!input) return;

  html2canvas(input, {
    scale: 2,
    useCORS: true,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a5"); // Set page size to A5
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${pdfname}.pdf`);
  });
};

export default downloadPdf;
