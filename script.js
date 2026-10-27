async function addCertificate() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const course = document.getElementById("course").value;

    await fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, course })
    });

    alert("✅ Certificate Added Successfully");
}

async function verifyCertificate() {
    const id = document.getElementById("verifyId").value;

    const response = await fetch('/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    });

    const data = await response.json();
    const resultDiv = document.getElementById("result");

    if (data.exists) {
        resultDiv.innerHTML =
            `<span class="valid">✅ Valid Certificate</span><br>
             Name: ${data.name}<br>
             Course: ${data.course}`;
    } else {
        resultDiv.innerHTML =
            `<span class="invalid">❌ Certificate Not Found</span>`;
    }
}