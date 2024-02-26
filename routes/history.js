const express = require("express");
const router = express.Router();
const History = require("../model/historySchema");
const PDFDocument = require("pdfkit");

function generateAndStreamPDF(res, allHistory) {
  try {
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=historical_results.pdf"
    );

    doc.pipe(res);

    doc.text("User History\n\n");

    allHistory.forEach((entry, index) => {
      doc.text(`${index + 1}. User id: ${entry.user_id}`);
      doc.text(
        `   ${entry.request_type} - ${entry.outcome} - ${entry.timestamp}`
      );
      doc.text("\n");
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }
}

router.get("/history", async (req, res) => {
  try {
    const allHistory = await History.find({});
    const downloadPDF = req.query.downloadPDF;

    if (downloadPDF) {
      // Call the function to generate and stream the PDF
      generateAndStreamPDF(res, allHistory);
    } else {
      // Render the "history" view
      res.render("history", { allHistory });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).render("errorPage", { error: "Error fetching history" });
  }
});

module.exports = router;
