document.addEventListener("DOMContentLoaded", function(event) { 
	var windowURL = new URL(window.location.href);
	var widgetTitle = windowURL.searchParams.get("title");
	var borderOn = windowURL.searchParams.get("border");

	if (borderOn) {
		document.body.classList.add("bordered");
	}

	function updateStats() {
		fetch("https://covird19.ru/index.html", {cache: "no-store"})
            .then(res => (res.text()))
            .then(data => {
                let dataDOM = new DOMParser().parseFromString(data, "text/html");
                let table = dataDOM.getElementsByClassName("stats")[0];

                let th = table.getElementsByTagName("th");
                th[1].textContent = "Заражено";

                let footerLink = document.createElement("a");
                footerLink.href = "https://covird19.ru/";
                footerLink.target = "_blank";
                footerLink.textContent = "covird19.ru";

                let footer = document.createElement("div");
                footer.className = "widget-footer";
                footer.textContent = "Источник: ";

                footer.appendChild(footerLink);

                let widget = document.getElementsByClassName("covird-widget")[0];

                if (widgetTitle) {
                	let titleEl = document.createElement("div");
                	titleEl.className = "widget-title";
                	titleEl.textContent = widgetTitle;

                	widget.appendChild(titleEl);
                }

                widget.appendChild(table);
                widget.appendChild(footer);
            });
	}

	updateStats();
});