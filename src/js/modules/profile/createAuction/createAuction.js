import { LISTINGS } from "../../../api/apiEndpoints.js";
import { getUserData } from "../myProfile/storage";
import { API_KEY } from "../../../api/api";

export async function handleCreateAuction(event) {
  event.preventDefault();
  console.log(LISTINGS);
  console.log(LISTINGS.CREATE);

  document.querySelectorAll(".auction-error").forEach((el) => el.classList.add("hidden"));

  const titleInput = document.querySelector("#auctionTitle");
  const descriptionInput = document.querySelector("#auctionDescription");
  const tagsInput = document.querySelector("#auctionTags");
  const imageUrlInput = document.querySelector("#auctionImage");
  const endDateInput = document.querySelector("#auctionEndDate");

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const tags = tagsInput.value.trim()
    ? tagsInput.value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];
  const imageUrl = imageUrlInput.value.trim();
  const endDate = endDateInput.value.trim();

  let hasError = false;

  if (!title) {
    showError(titleInput, "Title is required.");
    hasError = true;
  }

  if (!imageUrl) {
    showError(imageUrlInput, "Image URL is required.");
    hasError = true;
  } else if (!isValidImageUrl(imageUrl)) {
    showError(imageUrlInput, "Please enter a valid image URL.");
    hasError = true;
  }

  if (!endDate) {
    showError(endDateInput, "Auction end date is required.");
    hasError = true;
  }

  if (hasError) return;

  // Convert to required format with explicit milliseconds
  const dateObj = new Date(endDate);
  if (isNaN(dateObj.getTime())) {
    showError(endDateInput, "Invalid date format.");
    return;
  }
  const formattedEndDate = dateObj.toISOString();
  console.log("📅 Converted End Date:", formattedEndDate);

  // Ensure media follows API specs
  const media = imageUrl ? [{ url: imageUrl, alt: `Auction Image ${title}` }] : [];

  // Get user data (includes accessToken)
  const userData = getUserData();
  console.log(userData);

  const accessToken = userData.accessToken;

  const auctionData = {
    title,
    description: description || "",
    tags,
    media,
    endsAt: formattedEndDate,
  };

  console.log("🔹 Sending Auction Data:", JSON.stringify(auctionData, null, 2));

  try {
    const response = await fetch(LISTINGS.CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(auctionData),
    });

    const data = await response.json();
    console.log("Auction Created Response:", data);

    if (!response.ok) {
      console.error("Full API Error Response:", data);
      throw new Error(data.errors?.[0]?.message || "Failed to create auction.");
    }

    alert("Auction successfully created!");
    // window.location.reload();
    titleInput.value = "";
    descriptionInput.value = "";
    tagsInput.value = "";
    imageUrlInput.value = "";
    endDateInput.value = "";
  } catch (error) {
    console.error("Error creating auction:", error.message);

    const fullError = error.response?.errors || error.message;
    console.error("Detailed API Errors:", fullError);

    alert(fullError);
  }
}

/** Show Validation Errors for Inputs */
function showError(inputElement, message) {
  let errorElement = inputElement.parentNode.querySelector(".auction-error");
  if (!errorElement) {
    errorElement = document.createElement("p");
    errorElement.className = "auction-error text-red-500 text-sm absolute mt-1 left-0";
    inputElement.parentNode.appendChild(errorElement);
  }
  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

/** Validate Image URLs */
function isValidImageUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const validImageExtensions = /\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i;
    if (validImageExtensions.test(parsedUrl.pathname)) return true;

    const allowedDomains = ["unsplash.com", "freepik.com", "imgur.com", "robohash.org"];
    return allowedDomains.some((domain) => parsedUrl.hostname.includes(domain));
  } catch {
    return false;
  }
}
