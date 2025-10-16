import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const InvoicePage = ({ order }) => {
  const invoiceRef = useRef();
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      // Show SweetAlert popup
      Swal.fire({
        title: 'Downloading PDF...',
        html: 'Please wait!',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const element = invoiceRef.current;
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`invoice-${order._id}.pdf`);

      // Close SweetAlert after PDF is saved
      Swal.close();
    } catch (error) {
      Swal.close();
      console.error("PDF Download Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'PDF generate karne me error aa gaya!'
      });
    }
  };

  const handlePrint = () => window.print();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "16px" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Back Button */}
        <button
          style={{
            padding: "8px",
            backgroundColor: "#d1d5db",
            borderRadius: "6px",
            marginBottom: "16px",
          }}
          onClick={() => navigate("/admin/dashboard/orders")}
        >
          Back
        </button>

        {/* Invoice Container */}
        <div
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          {/* Success Banner */}
          <div
            style={{
              backgroundColor: "#d1fae5",
              color: "#065f46",
              padding: "16px",
              borderRadius: "6px",
              marginBottom: "16px",
              wordBreak: "break-word",
            }}
          >
            Thank You{" "}
            <strong>
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </strong>
            , Your order has been received!
          </div>

          {/* Invoice */}
          <div
            ref={invoiceRef}
            id="invoiceToPrint"
            style={{
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              border: "1px solid #e5e7eb",
              overflowX: "auto",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap" }}>
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>INVOICE</h2>
               <p>
  Status:{" "}
  <span
    style={{
      color: "#ffffff",
      backgroundColor: order.paymentMethod === "COD" ? "#10b981" : "#3b82f6",
      padding: "4px 10px",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "13px",
    }}
  >
    {order.paymentMethod === "COD" ? "Pending" : "Paid"}
  </span>
</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#059669" }}>
                  KACHA <span style={{ color: "#1f2937" }}>BAZAR</span>
                </h2>
                <p>59 Station Rd, Purls Bridge, United Kingdom</p>
              </div>
            </div>

            {/* Invoice Info */}
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderTop: "1px solid #e5e7eb",
              borderBottom: "1px solid #e5e7eb",
              padding: "16px 0",
              fontSize: "14px",
              marginBottom: "16px",
              flexWrap: "wrap"
            }}>
              <div style={{ marginBottom: "8px" }}>
                <p><strong>DATE:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>INVOICE NO.:</strong> #{order._id.slice(-5)}</p>
              </div>
              <div style={{ textAlign: "right", marginBottom: "8px" }}>
                <p><strong>INVOICE TO:</strong> {order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.email} &nbsp;&nbsp; {order.shippingAddress.phone}</p>
                <p>{order.shippingAddress.street}</p>
              </div>
            </div>

            {/* Order Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                fontSize: "14px",
                textAlign: "left",
                borderTop: "1px solid #e5e7eb",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "24px",
                borderCollapse: "collapse",
                minWidth: "600px"
              }}>
                <thead style={{ backgroundColor: "#f3f4f6", color: "#374151" }}>
                  <tr>
                    <th style={{ padding: "8px" }}>SR.</th>
                    <th style={{ padding: "8px" }}>PRODUCT NAME</th>
                    <th style={{ padding: "8px" }}>QUANTITY</th>
                    <th style={{ padding: "8px" }}>ITEM PRICE</th>
                    <th style={{ padding: "8px" }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} style={{ borderTop: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "8px" }}>{index + 1}</td>
                      <td style={{ padding: "8px" }}>{item.name}</td>
                      <td style={{ padding: "8px" }}>{item.quantity}</td>
                      <td style={{ padding: "8px", fontWeight: "600" }}>${item.price.toFixed(2)}</td>
                      <td style={{ padding: "8px", fontWeight: "600", color: "#b91c1c" }}>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Section */}
            <div style={{
              backgroundColor: "#ecfdf5",
              padding: "16px",
              borderRadius: "6px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              fontSize: "14px",
              flexWrap: "wrap"
            }}>
              <div>
                <p><strong>PAYMENT METHOD</strong></p>
                <p>{order.paymentMethod === "COD" ? "Cash" : "Online"}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p><strong>SHIPPING COST</strong> &nbsp;&nbsp; $20.00</p>
                <p><strong>DISCOUNT</strong> &nbsp;&nbsp; $0.00</p>
                <p style={{ fontSize: "18px", fontWeight: "700", color: "#b91c1c" }}>TOTAL AMOUNT: ${parseFloat(order.total).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "16px" }}>
            <button
              onClick={handleDownload}
              style={{
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                padding: "8px 20px",
                borderRadius: "6px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Download Invoice 📥
            </button>
            <button
              onClick={handlePrint}
              style={{
                backgroundColor: "#10b981",
                color: "#ffffff",
                padding: "8px 20px",
                borderRadius: "6px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Print Invoice 🖨️
            </button>
          </div>
        </div>
      </div>

      {/* Print CSS */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #invoiceToPrint, #invoiceToPrint * {
              visibility: visible;
            }
            #invoiceToPrint {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default InvoicePage;
