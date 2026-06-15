(function attachAuthHandlers(window, document) {
  "use strict";

  const api = window.AILearnAPI;

  function setCurrentYear() {
    document.querySelectorAll("[data-current-year]").forEach((item) => {
      item.textContent = new Date().getFullYear();
    });
  }

  function formValue(form, name) {
    const field = form.elements[name];
    return field ? field.value.trim() : "";
  }

  function validateSignup(form) {
    const username = formValue(form, "username").trim();
    const email = formValue(form, "email").trim();
    const password = formValue(form, "password");
    const confirmPassword = formValue(form, "confirmPassword");

    if (!username || username.length < 3)
      return "Username must be at least 3 characters.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";

    return "";
  }

  function validateLogin(form) {
    const username = formValue(form, "username").trim();
    const password = formValue(form, "password");

    if (!username || !password) {
      return "Please fill in all fields.";
    }
    return "";
  }

  async function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const button = form.querySelector("button[type='submit']");
    const validationError = validateLogin(form);
    const credentials = {
      username: formValue(form, "username"),
      password: formValue(form, "password"),
    };

    if (validationError) {
      api.showToast(validationError, "warning");
      return;
    }

    api.setBusy(button, true, "Logging in...");

    try {
      let result = await api.request("/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      let authToken = getLoginToken(result);
      if (
        !authToken &&
        result.baseUrl &&
        result.baseUrl !== api.getDefaultBackend()
      ) {
        result = await api.request("/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          baseUrl: api.getDefaultBackend(),
        });
        authToken = getLoginToken(result);
      }

      const username = getLoginUsername(result) || credentials.username;

      if (!authToken) {
        api.showToast(
          `Login response did not include a session token. The app is using ${result.baseUrl || api.getApiBase()}.`,
          "error",
        );
        api.clearSession();
        api.setBusy(button, false);
        return;
      }

      const persisted = api.setSession(authToken, username);

      if (!api.getToken()) {
        api.showToast(
          "Login succeeded, but your browser did not keep the session token. Please enable site storage and try again.",
          "error",
        );
        api.clearSession();
        api.setBusy(button, false);
        return;
      }

      if (!persisted) {
        api.showToast(
          "Your browser is blocking persistent storage, so the dashboard may not remember this login after refresh.",
          "warning",
        );
      }

      api.showToast("Login successful. Opening dashboard...", "success");
      window.setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 650);
    } catch (error) {
      api.showToast(
        error.message || "Login failed. Check your credentials.",
        "error",
      );
      api.setBusy(button, false);
    }
  }

  function getLoginToken(result) {
    return (
      result.authToken ||
      (result.json && (result.json.authToken || result.json.token)) ||
      ""
    );
  }

  function getLoginUsername(result) {
    return (
      result.username ||
      (result.json &&
        (result.json.username ||
          (result.json.user && result.json.user.username))) ||
      ""
    );
  }

  async function handleSignup(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const button = form.querySelector("button[type='submit']");
    const validationError = validateSignup(form);

    if (validationError) {
      api.showToast(validationError, "warning");
      return;
    }

    api.setBusy(button, true, "Creating account...");

    try {
      await api.request("/signup", {
        method: "POST",
        body: JSON.stringify({
          username: formValue(form, "username"),
          email: formValue(form, "email"),
          password: formValue(form, "password"),
        }),
      });

      api.showToast(
        "Registration successful. Redirecting to login...",
        "success",
      );
      form.reset();
      window.setTimeout(() => {
        window.location.href = "login.html";
      }, 850);
    } catch (error) {
      api.showToast(
        error.message || "Registration failed. Please try again.",
        "error",
      );
      api.setBusy(button, false);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (api.getToken()) {
      window.location.href = "dashboard.html";
      return;
    }

    setCurrentYear();

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (loginForm) loginForm.addEventListener("submit", handleLogin);
    if (signupForm) signupForm.addEventListener("submit", handleSignup);
  });
})(window, document);
