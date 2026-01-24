console.log("Add Item page script loaded.");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector(".item-form");
    const msgDiv = document.querySelector('.msg');

    if (!form) {
        console.error("Form element not found!");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        msgDiv.textContent = "Form submission is currently disabled for demo purposes.";
        msgDiv.style.color = "blue";
        msgDiv.style.display = "block";
        
        // Note: e.alert() doesn't exist, use alert() instead
        alert("Form submission is currently disabled for demo purposes.");
        
        setTimeout(() => {
            msgDiv.style.display = "none";
        }, 3000);
    });
}); 