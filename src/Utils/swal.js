import Swal from "sweetalert2";

/* ---------------- Base Dark + Blur Theme ---------------- */
const swalBase = {
  background: "rgba(17, 24, 39, 0.85)", // transparent dark
  color: "#e5e7eb",
  confirmButtonColor: "#165dfc",
  backdrop: `
    rgba(0,0,0,0.55)
    backdrop-filter: blur(6px)
  `,
};

/* ---------------- Themed Instance ---------------- */
export const themedSwal = Swal.mixin({
  ...swalBase,
  buttonsStyling: true,
});

/* ---------------- Helpers ---------------- */
export const confirmAction = (options) =>
  themedSwal.fire({
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirm",
    ...options,
  });

export const successAlert = (title, text) =>
  themedSwal.fire({
    icon: "success",
    title,
    text,
  });

export const errorAlert = (title, text) =>
  themedSwal.fire({
    icon: "error",
    title,
    text,
  });

export const loadingAlert = (title = "Processing...") =>
  themedSwal.fire({
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });