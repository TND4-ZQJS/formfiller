async function fillPDF() {
  const nomineeName = document.getElementById('nomineeName').value;
  const nomineeNRIC = document.getElementById('nomineeNRIC').value;
  const nomineeDOB = document.getElementById('nomineeDOB').value;
  const ownerName = document.getElementById('ownerName').value;
  const ownerNRIC = document.getElementById('ownerNRIC').value;

  // Load original PDF file
  const existingPdfBytes = await fetch("Nomination and Trustees_LF4056_LF4054.pdf").then(res => res.arrayBuffer());

  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  // Embed font
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

  // Fill fields with font size 10pt
  form.getTextField("Pg 2_1").setText(nomineeName);
  form.getTextField("Pg 2_1").updateAppearances(font, { fontSize: 10 });

  form.getTextField("Pg 2_2").setText(nomineeNRIC);
  form.getTextField("Pg 2_2").updateAppearances(font, { fontSize: 10 });

  form.getTextField("Pg 2_3").setText(nomineeDOB);
  form.getTextField("Pg 2_3").updateAppearances(font, { fontSize: 10 });

  form.getTextField("Pg 4_1").setText(ownerName);
  form.getTextField("Pg 4_1").updateAppearances(font, { fontSize: 10 });

  form.getTextField("Pg 4_2").setText(ownerNRIC);
  form.getTextField("Pg 4_2").updateAppearances(font, { fontSize: 10 });

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // Trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Filled_Nomination_Form.pdf';
  link.click();
}
