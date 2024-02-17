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
    const totalExpense = document.querySelector("#total-expense-span");
    let totalAmount = 0;

    if (!expenses) {
        const empty = document.createElement('h2');
        empty.textContent = "Empty expense list.";
        displaySection.appendChild(empty);
    }
    else {
        expenses.forEach((expense) => {

            const expenseCard = document.createElement("div");
            expenseCard.classList.add("card");

            const expenseTitle = document.createElement("h4");
            const amountSpan = document.createElement("span");
            const flagRemove_container = document.createElement("div");
            const removeBtn = document.createElement("button");
            const expenseTypeFlag = document.createElement("div");


            expenseTitle.classList.add("card-title");
            amountSpan.classList.add("card-amount");
            expense.expenseType === "credit" ?
                amountSpan.classList.add("card-amount-credit")
                : amountSpan.classList.add("card-amount-debit");
            flagRemove_container.classList.add("card-flag-remove-container");
            expenseTypeFlag.classList.add(`card-flag-${expense?.expenseType}`);
            removeBtn.classList.add("btn", "remove-btn");




            expenseTitle.textContent = expense?.title;

            amountSpan.textContent = "$" + expense.amount;

            totalAmount = expense.expenseType === "credit"
                ? totalAmount + expense.amount
                : totalAmount - expense.amount;

            removeBtn.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
            removeBtn.addEventListener("click", () => {
                deleteExpense(expense?._id);
            })

            flagRemove_container.append(removeBtn, expenseTypeFlag);
            expenseCard.append(expenseTitle, amountSpan, flagRemove_container);
            displaySection.append(expenseCard);
        })
        totalAmount >= 0
            ? totalExpense.classList.add("totalExpense-green")
            : totalExpense.classList.add("totalExpense-red");
        totalExpense.textContent = totalAmount;
    }
}

const deleteExpense = async (id) => {
    const expenses = await fetch(`http://localhost:7979/remove`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id })
    })
        .then((res) => res.json())
        .then((data) => {
            alert(`${data.message}`)
            window.location.href = "./index.html";
        })
        .catch((err) => console.log(err));
}