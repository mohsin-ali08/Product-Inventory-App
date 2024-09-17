import {
  db,
  auth,
  signOut,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
} from "./utlis/firestore.js";


function main() {
  // Get user data from local storage
  let user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  // Select DOM elements
  let LoginLink = document.getElementById("LoginLink");
  let SignupLink = document.getElementById("SignupLink");
  let logoutBtn = document.getElementById("logoutBtn");

  let LoginLinkMob = document.getElementById("LoginLinkMob");
  let SignupLinkMob = document.getElementById("SignupLinkMob");
  let logoutBtnMob = document.getElementById("logoutBtnMob");

  // Basic validation: check if user object exists and has the required properties
  if (user && user.email && user.username) {
    // User is logged in, hide login and signup links
    LoginLink.style.display = "none";
    SignupLink.style.display = "none";
    logoutBtn.classList.remove("hidden");

    // For mobile view
    LoginLinkMob.style.display = "none";
    SignupLinkMob.style.display = "none";
    logoutBtnMob.classList.remove("hidden");
  } else {
    // User is not logged in or user object is invalid
    console.log("User is not logged in or invalid user data");
    // Optionally reset UI if needed
    LoginLink.style.display = "block";
    SignupLink.style.display = "block";
    logoutBtn.classList.add("hidden");

    LoginLinkMob.style.display = "block";
    SignupLinkMob.style.display = "block";
    logoutBtnMob.classList.add("hidden");
  }
}

main();



window.toggleMenu = () => {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}


window.logout = () => {
  signOut(auth)
      .then(() => {
          main();
          localStorage.removeItem("user")
          localStorage.removeItem("data-id")
          window.location.reload()
      })
      .catch((err) => {
          alert(err.message)
      })
}











let products = [];
let editingIndex = null;

// Render the products table
function renderProductTable() {
  const productTableBody = document.getElementById("productTableBody");
  productTableBody.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4">${product.name}</td>
      <td class="px-6 py-4">${product.quantity}</td>
      <td class="px-6 py-4">$${product.price.toFixed(2)}</td>
      <td class="px-6 py-4">
        <button class="edit-btn bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded" 
                data-id="${product.id}">Edit</button>
        <button class="delete-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" 
                data-id="${product.id}">Delete</button>
      </td>
    `;
    productTableBody.appendChild(row);
  });

  // Attach event listeners to dynamically added buttons
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      editProduct(productId);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      deleteProduct(productId);
    });
  });
}

// Show the add/edit product form
document.getElementById("addProductBtn").addEventListener("click", () => {
  document.getElementById("addProductForm").classList.remove("hidden");
});

// Close the form when the cross (×) button is clicked
document.getElementById("closeFormBtn").addEventListener("click", () => {
  document.getElementById("addProductForm").classList.add("hidden");
});

// Handle form submission for adding or editing products
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const quantity = parseInt(document.getElementById("quantity").value, 10);
  const price = parseFloat(document.getElementById("price").value);

  if (editingIndex !== null) {
    // Update existing product
    const productId = products[editingIndex].id;
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, { name, quantity, price });
    editingIndex = null;
  } else {
    // Add new product
    await addDoc(collection(db, "products"), { name, quantity, price });
  }

  await fetchProducts();
  document.getElementById("addProductForm").classList.add("hidden");
  document.getElementById("productForm").reset();
});

// Edit a product
async function editProduct(productId) {
  const productRef = doc(db, "products", productId);
  const productSnapshot = await getDoc(productRef);
  const product = productSnapshot.data();

  document.getElementById("name").value = product.name;
  document.getElementById("quantity").value = product.quantity;
  document.getElementById("price").value = product.price;
  editingIndex = products.findIndex((p) => p.id === productId);

  document.getElementById("addProductForm").classList.remove("hidden");
}

// Delete a product
async function deleteProduct(productId) {
  try {
    await deleteDoc(doc(db, "products", productId));
    await fetchProducts();
    console.log(`Product with ID ${productId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting product: ", error);
  }
}

// Fetch products from Firestore
async function fetchProducts() {
  try {
    const productsCollection = collection(db, "products");
    const productSnapshot = await getDocs(productsCollection);
    products = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    renderProductTable();
    // console.log("Products fetched successfully.");
  } catch (error) {
    console.error("Error fetching products: ", error);
  }
}

// Initial fetch
fetchProducts();

// Expose functions to global scope
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;





