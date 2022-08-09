const Product = require("../models/product");

const getAllProduct = async (req, res) => {
  const {
    name,
    company,
    rating,
    feature,
    price,
    sort,
    fields,
    page,
    numericFilters,
  } = req.query;
  const PAGE_SIZE = 5;
  const PAGE = parseInt(page);
  const queryObj = {};
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      "=": "$eq",
      ">=": "$gte",
      "<=": "$gle",
    };
    const regEx = /\b(<|>|=|>=|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    // console.log(filters);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [fields, operator, value] = item.split("-");
      if (options.includes(fields)) {
        queryObj[fields] = { [operator]: Number(value) };
        console.log(queryObj);
      }
    });
  }
  if (company) {
    queryObj.company = company;
  }
  if (rating) {
    queryObj.rating = rating;
  }
  if (price) {
    queryObj.price = price;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  if (feature) {
    queryObj.feature = feature === "true" ? true : false;
  }
  let result = Product.find(queryObj);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createAt");
  }
  // fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  if (page) {
    // maxPage = 5 - 5 5 5 5 3
    // 1 2 3 4 5  page = 1
    // 6 7 8 9 10 page = 2
    const pageProducts = (PAGE - 1) * PAGE_SIZE;
    result.limit(PAGE_SIZE).skip(pageProducts);
  }
  console.log(queryObj);
  const products = await result;
  if (products.length > 0) {
    res.status(200).json({ products, amount: products.length });
  } else if (products.length < 1) {
    res.status(404).json({ msg: "not products match" });
  }
};

module.exports = { getAllProduct };
