// Set the timestamp when the form page loads
const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}


// Membership modal functionality
const modalButtons = document.querySelectorAll(".modal-button");

modalButtons.forEach(button => {

    button.addEventListener("click", () => {

        const modalId = button.dataset.modal;

        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }

    });

});


// Close buttons
const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }

    });

});


// Close modal when clicking outside the dialog
document.querySelectorAll("dialog").forEach(modal => {

    modal.addEventListener("click", event => {

        const rect = modal.getBoundingClientRect();

        const clickedInside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!clickedInside) {
            modal.close();
        }

    });

});