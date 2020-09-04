console.log("ya ya wes we get it.. IT WORKS!");

const tabs = document.querySelector(".tabs");
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(tabs.querySelectorAll('[role= "tabpanel"]'));

function handleTabClick(e) {
  tabPanels.forEach((panel) => (panel.hidden = true));
  tabButtons.forEach((tabButton) =>
    tabButton.setAttribute("aria-selected", false)
  );
  event.currentTarget.setAttribute("aria-selected", true);
  const { id } = e.currentTarget;

  //   Method 1:
  // const tabPanel = tabs.querySelector('[aria-labelledby="${id}"]')

  const tabPanel = tabPanels.find(
    (panel) => panel.getAttribute("aria-labelledby") === id
  );
  tabPanel.hidden = false;
}

tabButtons.forEach((button) =>
  button.addEventListener("click", handleTabClick)
);
