const params = new URLSearchParams(window.location.search);

const formResults = document.querySelector("#form-results");

const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const timestamp = params.get("timestamp");


formResults.innerHTML = `
    <div class="submitted-information">

        <p>
            <strong>First Name:</strong>
            ${firstName || "Not provided"}
        </p>

        <p>
            <strong>Last Name:</strong>
            ${lastName || "Not provided"}
        </p>

        <p>
            <strong>Email:</strong>
            ${email || "Not provided"}
        </p>

        <p>
            <strong>Mobile Number:</strong>
            ${phone || "Not provided"}
        </p>

        <p>
            <strong>Business / Organization:</strong>
            ${organization || "Not provided"}
        </p>

        <p>
            <strong>Application Timestamp:</strong>
            ${timestamp || "Not provided"}
        </p>

    </div>
`;