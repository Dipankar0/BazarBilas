module.exports = order => {
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 1200px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .producttable {
               width:100%;
                text-align: left;
             }
             .firsthr {
                margin-top: 50px;
                height: 2px;
                background-color: black;
             }
             .secondhr{
               height: 2px;
               background-color: black;
             }
             .totalPrice {
                text-align: right;
             }
          </style>
       </head>
       <body>
         <div class="invoice-box">
         <div class="header">
         <h1>Bazar Bilas</h1>
         <small>Natural . Organic . Pure</small>
         </div>
         <div>
             <p><strong>Customer Name</strong> : ${order.user.name}</p>
             <p><strong>Customer Mobile</strong> : ${order.user.phone}</p>
         </div>
         <hr class="firsthr">
         <div >
         <table border="1px solid black" class="producttable">
               <tr>
                  <th>Ship To</th>
                  <th>Invoice: ${order._id}</th>
               </tr>
               <tr>
                  <td>
                     ${order.user.name}<br />
                     ${order.phone}<br />
                     ${order.location}<br />
                     ${order.thana}
                  </td>
                  <td>
                     Order Date: ${order.date.getDate()}.${order.date.getMonth()}.${order.date.getFullYear()}<br />
                     Payment Type: Cash On Delivery<br />
                  </td>
               </tr>
             </table>
         </div>
         <div>
               <table border="1px solid black" class="producttable">
                  <tr>
                     <th>Product Name</th>
                     <th>Portion</th>
                     <th>Quantity</th>
                     <th>Price (BDT)</th>
                  </tr>
                  ${order.cart.products.map(product => {
                    return `<tr>
                     <td>${product.product.name}</td>
                     <td>${product.product.quantity}</td>
                     <td>${product.count}</td>
                     <td>${product.product.price}</td>
                  </tr>`;
                  })}
               </table>
         </div>
         <hr>
         <div class="totalPrice">
               <p>Product Price(BDT): ${order.cart.total}</p>
               <p>Delivery Price(BDT): ${order.deliveryCost}</p>
         </div>
         <hr class="secondhr">
         <p>Bazar Bilas Limited. &nbsp &nbsp +8801841904994. &nbsp &nbsp bazarbilas@gmail.com </p>
         <div>
       </body>
    </html>
    `;
};
