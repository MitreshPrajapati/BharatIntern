const Form = document.getElementById('registrationForm');

Form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const userData = {};

    formData.forEach((val, key) => {
        userData[key] = val;
    });

    try {
        let res = await fetch('https://bharatintern-registraionform.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(userData)
        }).then(r => r.json()).then(r => console.log(r));

        if (res.ok) {
            alert("Registration successfull.")
        } else {
            console.log("Error occured.")
        }
    } catch (error) {
        console.log(error);
    }
})