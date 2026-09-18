
/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle("show");

        }
    );

}


/* =========================================
   CART
========================================= */

let cart =
    JSON.parse(
        localStorage.getItem("bakeryCart")
    ) || [];


function saveCart() {

    localStorage.setItem(
        "bakeryCart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const count =
        document.getElementById("cartCount");

    if (!count) return;

    const totalItems =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    count.textContent =
        totalItems;

}


function addToCart(name, price) {

    price = Number(price);

    const existing =
        cart.find(
            item => item.name === name
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    alert(
        `${name} has been added to your cart ♡`
    );

}


function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();

}


function displayCart() {

    const container =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");

    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML =
            `<p class="empty-cart">
                Your cart is empty.
            </p>`;

        totalElement.textContent =
            "RM 0.00";

        return;

    }


    let total = 0;


    container.innerHTML =
        cart.map(
            (item, index) => {

                const itemTotal =
                    item.price *
                    item.quantity;

                total += itemTotal;


                return `

                <div class="cart-item">

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <br>

                        ${item.quantity}
                        × RM ${item.price.toFixed(2)}

                    </div>


                    <button
                        class="remove-item"
                        onclick="removeFromCart(${index})">

                        Remove

                    </button>

                </div>

                `;

            }
        ).join("");


    totalElement.textContent =
        `RM ${total.toFixed(2)}`;

}


function openCart() {

    const modal =
        document.getElementById(
            "cartModal"
        );

    if (!modal) return;

    modal.classList.add("show");

    displayCart();

}


function closeCart() {

    const modal =
        document.getElementById(
            "cartModal"
        );

    if (!modal) return;

    modal.classList.remove("show");

}


/* =========================================
   CHECKOUT
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    closeCart();


    const modal =
        document.getElementById(
            "orderModal"
        );

    if (modal) {

        modal.classList.add("show");

    }

}


function closeOrder() {

    const modal =
        document.getElementById(
            "orderModal"
        );

    if (!modal) return;

    modal.classList.remove("show");

}


const orderForm =
    document.getElementById(
        "orderForm"
    );


if (orderForm) {

    orderForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customerName"
                ).value;

            const phone =
                document.getElementById(
                    "customerPhone"
                ).value;

            const date =
                document.getElementById(
                    "orderDate"
                ).value;

            const notes =
                document.getElementById(
                    "orderNotes"
                ).value;


            let orderText =
                `Hello! I would like to place an order.%0A%0A`;

            orderText +=
                `Name: ${name}%0A`;

            orderText +=
                `WhatsApp: ${phone}%0A`;

            orderText +=
                `Preferred date: ${date}%0A%0A`;

            orderText +=
                `Order:%0A`;


            cart.forEach(item => {

                orderText +=
                    `• ${item.name} × ${item.quantity}%0A`;

            });


            orderText +=
                `%0ANotes: ${notes}`;


            const whatsappNumber =
                "601116147300";


            window.open(
                `https://wa.me/${601116147300}?text=${orderText}`,
                "_blank"
            );


            cart = [];

            saveCart();

            updateCartCount();

            closeOrder();

            orderForm.reset();


            alert(
                "Your order details have been prepared in WhatsApp ♡"
            );

        }
    );

}


/* =========================================
   REVIEWS
========================================= */

let reviews =
    JSON.parse(
        localStorage.getItem(
            "bakeryReviews"
        )
    ) || [];


function saveReviews() {

    localStorage.setItem(
        "bakeryReviews",
        JSON.stringify(reviews)
    );

}


function displayReviews() {

    const container =
        document.getElementById(
            "reviewsContainer"
        );

    if (!container) return;


    if (reviews.length === 0) {

        container.innerHTML = `

            <div class="review-card">

                <div class="review-stars">
                    ★★★★★
                </div>

                <p class="review-text">
                    "Your review could be
                    the first one here ♡"
                </p>

                <p class="review-name">
                    A happy customer
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        reviews.map(
            review => `

            <div class="review-card">

                <div class="review-stars">

                    ${"★".repeat(
                        Number(review.rating)
                    )}

                </div>

                <p class="review-text">

                    "${review.text}"

                </p>

                <p class="review-name">

                    — ${review.name}

                </p>

            </div>

            `
        ).join("");

}


function openReviewForm() {

    const modal =
        document.getElementById(
            "reviewModal"
        );

    if (!modal) return;

    modal.classList.add("show");

}


function closeReviewForm() {

    const modal =
        document.getElementById(
            "reviewModal"
        );

    if (!modal) return;

    modal.classList.remove("show");

}


const reviewForm =
    document.getElementById(
        "reviewForm"
    );


if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "reviewName"
                ).value;

            const rating =
                document.getElementById(
                    "reviewRating"
                ).value;

            const text =
                document.getElementById(
                    "reviewText"
                ).value;


            reviews.push({

                name: name,

                rating: rating,

                text: text

            });


            saveReviews();

            displayReviews();

            closeReviewForm();

            reviewForm.reset();


            alert(
                "Thank you for your lovely review ♡"
            );

        }
    );

}


/* =========================================
   BULK ORDER FORM
========================================= */

const bulkForm =
    document.getElementById(
        "bulkForm"
    );


if (bulkForm) {

    bulkForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "bulkName"
                ).value;

            const phone =
                document.getElementById(
                    "bulkPhone"
                ).value;

            const eventType =
                document.getElementById(
                    "bulkEvent"
                ).value;

            const quantity =
                document.getElementById(
                    "bulkQuantity"
                ).value;

            const date =
                document.getElementById(
                    "bulkDate"
                ).value;

            const message =
                document.getElementById(
                    "bulkMessage"
                ).value;


            let whatsappText =
                `Hello! I would like to enquire about a bulk order.%0A%0A`;

            whatsappText +=
                `Name: ${name}%0A`;

            whatsappText +=
                `WhatsApp: ${phone}%0A`;

            whatsappText +=
                `Event: ${eventType}%0A`;

            whatsappText +=
                `Quantity: ${quantity}%0A`;

            whatsappText +=
                `Date: ${date}%0A`;

            whatsappText +=
                `Message: ${message}`;


            const whatsappNumber =
                "60123456789";


            window.open(
                `https://wa.me/${601116147300}?text=${whatsappText}`,
                "_blank"
            );

        }
    );

}


/* =========================================
   INITIALISE
========================================= */

updateCartCount();

displayReviews();
