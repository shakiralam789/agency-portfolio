import { toast } from "react-toastify";

export function extractDate(dateString) {
  return dateString.split("T")[0];
}

export function isValidNumberInRange(
  inputValue,
  minValue = 0,
  maxValue = Infinity
) {
  const numberValue = Number(inputValue);
  if (
    !isNaN(numberValue) &&
    numberValue >= minValue &&
    numberValue <= maxValue
  ) {
    return true;
  }
  return false;
}

export const rangeMsg = "Amount will be max 999999999999.99";

export function formatNumber(number, locale = "en_US") {
  let updatedCode = locale.replace("_", "-");
  return new Intl.NumberFormat(updatedCode).format(number);
}

export function toNumberWithTwoDecimals(value, locale = "en_US", symbol = "$") {
  return isNaN(Number(value))
    ? symbol + " " + formatNumber("0.00", locale)
    : symbol + " " + formatNumber(Number(value).toFixed(2), locale);
}

export function toNumber(value) {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

export function isNumber(value) {
  const numberValue = Number(value);

  if (!isNaN(numberValue) || value === "-") {
    return true;
  }

  return false;
}

export function isInteger(value) {
  // Allow empty string for clearing input
  if (value === "" || value === "-" || /^-?\d+$/.test(value)) {
    return true;
  }
  return false;
}

export function handleCopyLink({ content }) {
  const link = content;

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy the link: ", err);
      });
  } else {
    // Fallback for browsers without Clipboard API support
    const textArea = document.createElement("textarea");
    textArea.value = link;
    textArea.style.position = "fixed"; // Avoid scrolling to bottom
    textArea.style.opacity = "0"; // Hide element visually
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      console.log(
        successful ? "Link copied to clipboard!" : "Failed to copy link"
      );
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  }
}

export function formatDateToYYYYMMDD(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function handleBack() {
  window.history.back();
}

export function getQueryParamsFromUrl() {
  const queryParams = new URLSearchParams(window.location.search);
  const query = {};
  for (const [key, value] of queryParams.entries()) {
    query[key] = value;
  }
  return query;
}

export default function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export const notAllRoute = [
  "login",
  "logout",
  "register",
  "forgot-password",
  "reset-password",
];

let notAllowedRoutePrefix = (path) => {
  return notAllRoute.includes(path);
};

export function handleSuccessMessage(response, method, url) {
  if (
    !response ||
    method.toUpperCase() == "GET" ||
    notAllowedRoutePrefix(url.replace("/api/v1/", ""))
  ) {
    return;
  }

  const successMessage = response?.message;

  if (successMessage) {
    toast.success(successMessage);
  } else {
    toast.success("Operation is successful");
  }
}

export function handleErrorMessage({ error, statusCode, method, url = "" }) {
  if (!error || method.toUpperCase() == "GET") {
    // if (url != "/api/v1/profile") window.location.href = "/not-found";
    return;
  }

  if (
    [500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511].includes(
      statusCode
    )
  ) {
    toast.error("Something went wrong.");
    return;
  }

  const errorMessage = error?.message;

  if (statusCode == 401 || statusCode == 403 || statusCode == 419) {
    if (statusCode == 401) {
      toast.error(errorMessage || "User is not authorized");
    } else if (statusCode == 403) {
      toast.error(errorMessage || "Forbidden");
    } else if (statusCode == 419) {
      toast.error(errorMessage || "Expired session");
    }
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
    return;
  }

  toast.error(errorMessage || "An error occurred, please try again.");
}
