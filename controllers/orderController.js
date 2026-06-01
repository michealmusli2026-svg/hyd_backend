const db = require("../config/db");

// const db = require("../config/db");
exports.createOrder = (req,res)=>{

  const data = req.body;
  console.log(data)
  const sql = `
  INSERT INTO orders
  (order_date,agent_id,party_id,to_party,city,commodity_id,
  order_amount,delivery_charge,vendor_id,vendor_cost,
  payment_type,remark_mobile,remark_token,
  final_amount,my_charge,profit)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  const values = [
    data.date,
    data.agent,
    data.party,
    data.toParty,
    data.city,
    data.commodity,
    data.orderAmount,
    data.deliveryCharge,
    data.vendor,
    data.vendorCost > 0 ? data.vendorCost : 0,
    // 0,
    data.paymentType,
    data.remarkMobile,
    data.remarkToken,
    data.finalAmount,
    data.myCharge,
    data.profit
  ];

  db.query(sql,values,(err,result)=>{

    if(err){
      return res.status(500).json(err);
    }

    res.json({
      message:"Order created",
      id: result.insertId
    })

  });

};


exports.getOrders = async (req, res) => {
  const sql = `
    SELECT
      o.*,
      p.name AS party,
      v.name AS vendor,
      a.name AS agent
    FROM orders o
    LEFT JOIN parties p ON o.party_id = p.id
    LEFT JOIN vendors v ON o.vendor_id = v.id
    LEFT JOIN agents a ON o.agent_id = a.id
    ORDER BY o.id DESC
  `;

  try {
    const [result] = await db.query(sql);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
};