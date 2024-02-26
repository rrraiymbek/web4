// routes/adminRouter.js
const express = require("express");
const router = express.Router();
const Item = require("../model/itemModel");

// Render the list of items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find({ "timestamps.deleted": { $exists: false } });
    res.render("admin", { items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send("Error fetching items. Please try again.");
  }
});

router.get("/add", (req, res) => {
  res.render("addItem");
});

router.post("/add", async (req, res) => {
  const {
    enName,
    esName,
    enDescription,
    esDescription,
    pictures,
    picture2,
    picture3,
    picture4,
  } = req.body;

  try {
    const picturesArray = pictures
      ? pictures.split(",").map((pic) => pic.trim())
      : [];
    const additionalPictures = [picture2, picture3, picture4]
      .filter(Boolean)
      .map((pic) => pic.trim());

    const newItem = await new Item({
      names: { en: enName, es: esName },
      descriptions: { en: enDescription, es: esDescription },
      pictures: [...picturesArray, ...additionalPictures],
    });

    await newItem.save();
    console.log("Item added successfully:", newItem);
    res.redirect("/admin"); 
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).send("Error adding item. Please try again.");
  }
});


router.get("/edit/:itemId", async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.render("editItem", { item });
  } catch (error) {
    console.error("Error fetching item for editing:", error);
    res.status(500).send("Error fetching item for editing. Please try again.");
  }
});

router.post("/edit/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  const {
    enName,
    esName,
    enDescription,
    esDescription,
    pictures,
    picture2,
    picture3,
    picture4,
  } = req.body;

  try {
    const picturesArray = pictures
      ? pictures.split(",").map((pic) => pic.trim())
      : [];
    const additionalPictures = [picture2, picture3, picture4]
      .filter(Boolean)
      .map((pic) => pic.trim());

    await Item.findByIdAndUpdate(itemId, {
      names: { en: enName, es: esName },
      descriptions: { en: enDescription, es: esDescription },
      pictures: [...picturesArray, ...additionalPictures],
      "timestamps.updated": Date.now(),
    });

    console.log("Item updated successfully");
    res.redirect("/admin"); // Redirect to the admin page after item editing
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Error updating item. Please try again.");
  }
});

router.post("/delete/:itemId", async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send("Item not found");
    }

    // Soft delete by marking the item as deleted in the timestamps
    await Item.findByIdAndUpdate(itemId, {
      "timestamps.deleted": Date.now(),
    });

    console.log("Item deleted successfully");
    res.redirect("/admin"); // Redirect to the admin page after item deletion
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Error deleting item. Please try again.");
  }
});


module.exports = router;
