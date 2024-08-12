import { $ } from "dom";

export const setupLicense = () => {
  const licenseEl = $.p("");
  $("#license")!.append($.div($.p("Today's Fishing License"), licenseEl));
  const license = localStorage.getItem("license") || "";
  licenseEl.innerText = license;
  $.listen("new-license", (e) => {
    const { license } = e.detail.data;
    localStorage.setItem("license", license);
    licenseEl.innerText = license;
  });
};
