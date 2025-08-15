
  const payBtn = document.getElementById("payBtn");

  payBtn.addEventListener("click", function () {
    payBtn.disabled = true;
    payBtn.textContent = "Processing...";
    payBtn.classList.add("loading");

    const options = {
      key: "rzp_test_lhVIsNmCaJoorn", // Razorpay Key ID
      amount: 19900, 
      currency: "INR",
      name: "Digital Income Blueprint",
      description: "Start Earning Today",
      image: "https://i.postimg.cc/XqRdp5w3/13ea9d70df14a98b23f51fb7b8b663bb.jpg",
      handler: async function (response) {
  payBtn.textContent = "Redirecting...";
  
  try {
    const userEmail = document.getElementById("userEmail").value;
    const webhook = "https://hook.eu2.make.com/7f5jl5jg0ipec9srkeyopcgq53oo8luy";

    const result = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        razorpay_payment_id: response.razorpay_payment_id,
        email: userEmail
      })
    });

    if (result.ok) {
      window.location.href = "success.html";
    } else {
      alert("Payment captured, but delivery failed.");
    }
  } catch (error) {
    console.error("Webhook Error:", error);
    alert("Payment successful but something went wrong.");
  }
}
,
      prefill: {
        name: "",
        email: "",
        contact: ""
      },
      theme: {
        color: "#121212"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", function () {
      payBtn.disabled = false;
      payBtn.textContent = "Pay Now";
      payBtn.classList.remove("loading");
      alert("Payment Failed.");
    });
  });

