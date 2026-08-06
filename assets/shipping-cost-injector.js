// // Shipping Cost Display Injector
// // Minimal - only responds to cart update events, no polling

// (function() {
//   let lastCartTotal = null;
  
//   function injectShippingDisplay() {
//     const skeleton = document.querySelector('.shipping-cost-display-skeleton');
    
//     if (!skeleton) {
//       return;
//     }

//     fetch('/cart.js')
//       .then(response => response.json())
//       .then(cart => {
//         try {
//           const cartTotal = cart.total_price / 100;
          
//           // Only update if cart total changed
//           if (lastCartTotal === cartTotal) {
//             return;
//           }
//           lastCartTotal = cartTotal;

//           const freeShippingThreshold = 199;
//           const shippingCost = 25;

//           // Find any existing injected display
//           const existing = document.querySelector('.shipping-cost-display-injected');
//           if (existing) {
//             existing.remove();
//           }

//           // Create the shipping display
//           const shippingDisplay = document.createElement('div');
//           shippingDisplay.className = 'shipping-cost-display-injected';
          
//           const isFreeshipping = cartTotal >= freeShippingThreshold;
//           const bgColor = isFreeshipping ? '#E8F5E9' : '#FFF3E0';
//           const borderColor = isFreeshipping ? '#4CAF50' : '#BA7517';
//           const textColor = isFreeshipping ? '#2E7D32' : '#854F0B';
//           const progressColor = isFreeshipping ? '#4CAF50' : '#BA7517';

//           // Calculate progress percentage
//           const progressPercent = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
//           const remainingAmount = Math.max(freeShippingThreshold - cartTotal, 0);

//           let contentHTML = '';
//           if (isFreeshipping) {
//             contentHTML = `
//               <p style="font-size: 12px; font-weight: 500; color: ${textColor}; margin: 0 0 8px; direction: rtl;">משלוח: חינם ✓</p>
//               <div style="position: relative; height: 4px; background: #e0e0e0; border-radius: 2px; overflow: visible;">
//                 <div style="position: absolute; right: 0; height: 100%; width: 100%; background: ${progressColor}; border-radius: 2px; transition: width 0.3s ease;"></div>
//                 <div style="position: absolute; left: -6px; top: 50%; transform: translateY(-50%); width: 12px; height: 12px; background: ${progressColor}; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.15); z-index: 1;"></div>
//               </div>
//             `;
//           } else {
//             contentHTML = `
//               <p style="font-size: 12px; font-weight: 500; color: ${textColor}; margin: 0 0 8px; direction: rtl;">דמי משלוח: ${shippingCost} ₪</p>
//               <div style="position: relative; height: 4px; background: #e0e0e0; border-radius: 2px; overflow: visible; margin-bottom: 6px;">
//                 <div style="position: absolute; right: 0; height: 100%; width: ${progressPercent}%; background: ${progressColor}; border-radius: 2px; transition: width 0.3s ease;"></div>
//                 <div style="position: absolute; right: calc(${progressPercent}% - 6px); top: 50%; transform: translateY(-50%); width: 12px; height: 12px; background: ${progressColor}; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.15); z-index: 1; transition: right 0.3s ease;"></div>
//               </div>
//               <p style="font-size: 10px; color: ${textColor}; margin: 0; direction: rtl; opacity: 0.8;">עוד ₪${remainingAmount.toFixed(0)} כדי משלוח חינם</p>
//             `;
//           }

//           shippingDisplay.style.cssText = `
//             background-color: ${bgColor};
//             border-radius: 8px;
//             padding: 12px;
//             margin: 12px 0;
//             border-left: 3px solid ${borderColor};
//             border-radius: 0;
//             border-radius: 8px;
//           `;
          
//           shippingDisplay.innerHTML = contentHTML;

//           // Replace skeleton with actual display
//           skeleton.replaceWith(shippingDisplay);
//         } catch (error) {
//           console.error('Error creating shipping display:', error);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching cart data:', error);
//       });
//   }

//   // Only run on page load
//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', injectShippingDisplay);
//   } else {
//     injectShippingDisplay();
//   }

//   // Only update when cart is explicitly updated by user
//   document.addEventListener('shopify:cart:updated', function() {
//     setTimeout(injectShippingDisplay, 50);
//   });
// })();