const form = document.querySelector("#expense-form");
form.addEventListener("submit", handleForm);

async function handleForm(e) {
    e.preventDefault();

    const jsonData = {};
    const formData = new FormData(this);
    formData.forEach((val, key) => {
        jsonData[key] = val;
    });

    try {
        await fetch('http://localhost:7979/createExpense', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
            .then((response) => {
                // console.log(response.status)
                if (response.status === 200) {
                    alert("Successfully added expense!");
                    window.location.href = "./index.html";
                } else {
                    throw new Error("Failed to add expense.");
                }
            })
    } catch (error) {
        console.log(error);
    }
}

const getExpenses = async () => {
    const expenses = await fetch('http://localhost:7979/')
        .then((res) => res.json())
        .catch((err) => console.log(err));

    await displayExpenses(expenses?.expenses);

}

window.onload = () => {
    getExpenses();
}

const displayExpenses = (expenses) => {
    const displaySection = document.querySelector("#expense-container");

    if (!expenses) {
        const empty = document.createElement('h2');
        empty.textContent = "Empty expense list.";
        displaySection.appendChild(empty);
    } else {
        expenses.forEach((expense) => {
            const expenseCard = document.createElement("div");
            expenseCard.classList.add("card");
            const expenseTitle = document.createElement("h4");
            expenseTitle.textContent = "Your Expenses";
            expenseTitle.classList.add("expense-title");
            const expenseAmount = document.createElement("p");
            expenseAmount.textContent = "Expenses Amount: ";
            const amountSpan = document.createElement("span");

            // expense.amount < 0 ? amountSpan.textContent = "$" + expense.amount + " Creadit" 
            amountSpan.textContent = "$" + expense.amount;
            expenseAmount.append(amountSpan);
            expense.amount > 0 ?
                amountSpan.classList.add("expense-amount-creadit")
                : amountSpan.classList.add("expense-amount-debit");
            expenseCard.append(expenseTitle, expenseAmount);
            displaySection.appendChild(expenseCard);
        })
    }
}