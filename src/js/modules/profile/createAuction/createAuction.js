import { LISTINGS } from "../../../api/apiEndpoints.js";
import { getUserData } from "../myProfile/storage";
import { API_KEY } from "../../../api/apiKey.js";
import { loadMyCurrentAuctions } from "../myCurrentAuctions/myCurrentAuctions.js";
import { loadModal, showUniversalModal } from "../../../modal/modal.js"; // Import modal

export async function handleCreateAuction(event) {
  event.preventDefault();
  await loadModal();
  // Hide any previous errors before validation starts
  document.querySelectorAll(".auction-error").forEach((el) => el.classList.add("hidden"));

  // Grab input elements
  const titleInput = document.querySelector("#auctionTitle");
  const descriptionInput = document.querySelector("#auctionDescription");
  const tagsInput = document.querySelector("#auctionTags");
  const imageUrlInput = document.querySelector("#auctionImage");
  const endDateInput = document.querySelector("#auctionEndDate");

  // Get input values
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

  // Inline validation for each field
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

  // Stop function if validation errors exist
  if (hasError) return;

  // Convert date to API-required format
  const dateObj = new Date(endDate);
  if (isNaN(dateObj.getTime())) {
    showError(endDateInput, "Invalid date format.");
    return;
  }
  const formattedEndDate = dateObj.toISOString();

  // Format media according to API specs
  const media = imageUrl ? [{ url: imageUrl, alt: `Auction Image: ${title}` }] : [];

  // Get user authentication data
  const userData = getUserData();
  const accessToken = userData.accessToken;

  const auctionData = {
    title,
    description: description || "",
    tags,
    media,
    endsAt: formattedEndDate,
  };
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

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Failed to create auction.");
    }
    showUniversalModal("Success", "Your auction has been created successfully!");

    // Reload user's auction list to show the new auction
    loadMyCurrentAuctions();

    // Clear form fields after successful creation
    titleInput.value = "";
    descriptionInput.value = "";
    tagsInput.value = "";
    imageUrlInput.value = "";
    endDateInput.value = "";
  } catch (error) {
    showUniversalModal("Error", error.message || "An unexpected error occurred.");
  }

  // try {
  //   const response = await fetch(LISTINGS.CREATE, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //       "X-Noroff-API-Key": API_KEY,
  //     },
  //     body: JSON.stringify(auctionData),
  //   });

  //   const data = await response.json();

  //   if (!response.ok) {
  //     console.error("Full API Error Response:", data);
  //     throw new Error(data.errors?.[0]?.message || "Failed to create auction.");
  //   }

  //   // ✅ Show success modal when auction is created
  //   showUniversalModal("Success", "Your auction has been created successfully!");

  //   // Reload user's auction list to show the new auction
  //   loadMyCurrentAuctions();

  //   // Clear form fields after successful creation
  //   titleInput.value = "";
  //   descriptionInput.value = "";
  //   tagsInput.value = "";
  //   imageUrlInput.value = "";
  //   endDateInput.value = "";
  // } catch (error) {
  //   console.error("Error creating auction:", error.message);

  //   // ✅ Show error modal when API request fails
  //   showUniversalModal("Error", error.message || "An unexpected error occurred.");
  // }
}

/** Show Inline Validation Errors Under Inputs */
function showError(inputElement, message) {
  let errorElement = inputElement.parentNode.querySelector(".auction-error");

  if (!errorElement) {
    errorElement = document.createElement("p");
    errorElement.className = "auction-error text-red-500 text-sm mt-1";
    inputElement.parentNode.appendChild(errorElement);
  }

  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

/** Validate Image URLs */
function isValidImageUrl(url) {
  try {
    const parsedUrl = new URL(url);

    // Allow direct image links with common extensions
    const validImageExtensions = /\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i;
    if (validImageExtensions.test(parsedUrl.pathname)) return true;

    // Allow images from these trusted domains
    const allowedDomains = ["unsplash.com", "freepik.com", "imgur.com", "robohash.org"];
    return allowedDomains.some((domain) => parsedUrl.hostname.endsWith(domain));
  } catch {
    return false;
  }
}
