const braintree = require("braintree");
const accountSchema = require("../models/Accounts");
const Payments = require("../models/Paymentsmodel");
const hostelaccounts = require("../models/HostelAccount");


require('dotenv').config();
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const updateUserPaid = async (user_id, amount) => {

  const account = await accountSchema.findOne({ user_id });
  if (!account) {
    throw new Error("Account not found");
  }
  const updatedPaid = account.user_paid + amount;
  await accountSchema.findByIdAndUpdate(account._id, { user_paid: updatedPaid, user_dues: 0 });
};

const updateHostelPaid = async (hostel_no, amount) => {
  // console.log(hostel_no+" "+amount);
  const hostelAccount = await hostelaccounts.findOne({ hostel_no });
  // console.log(hostelAccount);
  if (!hostelAccount) {
    throw new Error("Hostel account not found");
  }
  hostelAccount.hostel_paid += amount;
  await hostelAccount.save();
};

const braintreePaymentController = async (req, res) => {
  try {
    const { user_id, nonce, amount, hostel_no } = req.body;

    const newTransaction = await gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    });

    if (newTransaction.success) {
      const T_id = newTransaction.transaction.id;
      await updateHostelPaid(hostel_no, amount);
      await updateUserPaid(user_id, amount);
      const transaction = new Payments({
        T_id,
        user_id,
        amount,
        hostel_no,
        status: "Verified",
      });
      await transaction.save();
      console.log("IN");
      return res.status(200).json({ message: "User Paid updated successfully" });
    } else {
      return res.status(500).json({ error: newTransaction.message });
    }
  } catch (error) {
    console.error("Error processing payment:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        console.error("Error generating client token:", err);
        return res.status(500).json({ error: "Failed to generate client token" });
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.error("Error generating client token:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const formTransaction = async (req, res) => {
  try {
    const { user_id, T_id, amount, hostel_no } = req.body;

    if (!T_id || !amount) {
      return res.status(400).json({ error: "T_id and amount are required" });
    }

    await updateHostelPaid(hostel_no, amount);
    await updateUserPaid(user_id, amount);

    const transaction = new Payments({
      T_id,
      user_id,
      amount,
      hostel_no,
    });
    await transaction.save();
    console.log("IN");

    return res.status(200).json({ message: "Transaction saved successfully" });
  } catch (error) {
    console.error("Error processing form transaction:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { braintreePaymentController, braintreeTokenController, formTransaction };
