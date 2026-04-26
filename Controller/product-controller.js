const ProductModel = require("../Model/product-model");

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    if (!product) {
      return res.satus(400).json({
        message: "Product needed",
        status: "failed",
      });
    }

    const response = await ProductModel.create(product);

    res.status(202).json({
      message: "Product successfully added",
      status: "success",
      product: response,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
      satus: "failed",
    });
  }
};

const getHoodies = async (req, res) => {
  try {
    const data = await ProductModel.find({ category: "hoodie" });
    if (!data) {
      res.status(404).json({
        message: "No products found",
        status: "failed",
      });
    }

    res.status(200).json({
      message: "Hoodies",
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
};

const getHoodiesByID = async (req, res) => {
  try {
    console.log("hit");
    const { id } = req.params;

    if (!id) {
      return res.status(500).json({
        message: "ID is required",
        status: "failed",
      });
    }

    const data = await ProductModel.findById(id);

    if (!data) {
      return res.status(500).json({
        message: "No product found with this id",
        status: "failed",
      });
    }

    res.status(200).json({
      message: "Hoodie fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
};

const getTShirts = async (req, res) => {
  try {
    const data = await ProductModel.find({ category: "tshirt" });
    if (!data) {
      res.status(404).json({
        message: "No products found",
        status: "failed",
      });
    }

    res.status(200).json({
      message: "Hoodies",
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
};

const getOversizedTshirts = async (req, res) => {
  try {
    const data = await ProductModel.find({ category: "over-sized-tshirt" });
    if (!data) {
      res.status(404).json({
        message: "No products found",
        status: "failed",
      });
    }

    res.status(200).json({
      message: "Hoodies",
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
};

const getDesignedPunjabis = async (req, res) => {
  try {
    const data = await ProductModel.find({ category: "punjabi" });
    if (!data) {
      res.status(404).json({
        message: "No products found",
        status: "failed",
      });
    }

    res.status(200).json({
      message: "Hoodies",
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
};

const getFullSleveTshirts = async (req, res) => {
  try {
    const data = await ProductModel.find({ category: "fullSleeveTshirt" });

    if (!data) {
      res.status(404).json({
        message: "No products found",
        status: "failed",
      });
    }

    res.status(200).json({
      message: "Hoodies",
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
};

const getCurrentProducts = async (req, res) => {
  try {
    const data = await ProductModel.find().sort({ createdAt: -1 }).limit(10);
    if (!data) {
      res.status(404).json({
        message: "No products found",
        status: "failed",
      });
    }

    res.status(200).json({
      message: "All Products",
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
};

const getProductsByName = async (req, res) => {
  try {
    const { name } = req.query;
    console.log(name);

    const products = await ProductModel.find({
      name: { $regex: name, $options: "i" },
    });

    res.status(200).json({
      message: "Product found",
      status: "success",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
};

module.exports = {
  addProduct,
  getHoodies,
  getHoodiesByID,
  getTShirts,
  getFullSleveTshirts,
  getDesignedPunjabis,
  getOversizedTshirts,
  getCurrentProducts,
  getProductsByName,
};
