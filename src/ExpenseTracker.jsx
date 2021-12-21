import React, { useState } from "react";
import "./expenses.css";

export const ExpenseTracker = () => {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");
    const [income, setIncome] = useState(false);

    const [data, setData] = useState(
        JSON.parse(localStorage.getItem('data')) || []
    );

    const onTextChange = (e) => {
        setText(e.target.value);
    };
    const onIncomeChange = (e) => {
        setIncome(e.target.checked);
    };

    const onAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const incomeValue = () => {
        let incomeSum = 0;

        data.forEach((e) => {
            if (e.isIncome) {
                incomeSum = incomeSum + Number(e.amount);
            }
        });
        return incomeSum;
    };
    const expenseValue = () => {
        let expenseSum = 0;
        data.forEach((e) => {
            if (!e.isIncome) {
                expenseSum = expenseSum + Number(e.amount);
            }
        });
        return expenseSum;
    };

    const balanceValue = () => {
        let income = incomeValue();
        let expense = expenseValue();
        return income - expense;
    };
    const onAdd = (event) => {
        event.preventDefault();
        const item = {
            id: Date.now(),
            text: text,
            amount: amount,
            isIncome: income,
        };
        let newData = data;
        newData.push(item);
        setData(newData);
        localStorage.setItem("data", JSON.stringify(newData))

        setText("");
        setAmount("");
        document.querySelector('#mainInput').value = "";
        document.querySelector('#mainInput2').value = "";
    };

    const getColorGreen = () => {
        let income = incomeValue()
        if (income > 0) {
            return "green"
        }
    }
    const getColorRed = () => {
        let income = incomeValue()
        if (income > 0) {
            return "red"
        }
    }
    const getColor = () => {
        let balance = incomeValue() - expenseValue()
        console.log(balance)
        if (balance > 0) {
            return "green"
        } else {
            return "red"
        }
    }
    const handleDelete = (elem) => {
        let newData = data.filter((el) => el.id !== elem.id);
        setData(newData);
        localStorage.setItem("data", JSON.stringify(newData))
    };
    return (
        <section className="expense-container">
            <h1 className="expense-header">Expense Tracker</h1>
            <div className="all">
                <div className="all-price">

                    <div className="price-container">

                        <div>
                            <h4>Income</h4>
                            <p id={getColorGreen()}>${incomeValue()}</p>
                        </div>

                        <div>
                            <h4>Expense</h4>
                            <p id={getColorRed()}>${expenseValue()}</p>
                        </div>

                    </div>

                    <div className="balance-container">
                        <h4 className="balance" >Your balance:</h4>
                        <div className="balance " id={getColor()}>${balanceValue()}</div>

                    </div>

                    <div className="add-container">
                        <h3 className="add-title">Add new transaction</h3>
                        <form onSubmit={onAdd}>
                            <div className="text">
                                <label className="add-label label" >Text</label>
                                <input
                                    className="add-input"
                                    type="text"
                                    id="mainInput"
                                    placeholder="Enter text"
                                    onChange={(event) => onTextChange(event)} required
                                />
                            </div>
                            <div className="text">
                                <label className="add-label">Amount</label>
                                <input
                                    className="add-input"
                                    type="number"
                                    id="mainInput2"
                                    placeholder="Enter amount"
                                    onChange={(event) => onAmountChange(event)} required
                                />
                            </div>
                            <div className="text" >
                                <input id="sanad"
                                    type="checkbox"
                                    onChange={(event) => onIncomeChange(event)}
                                />
                                <label>Income</label>
                            </div>

                            <button className="btn-add">Add transaction</button>
                        </form>
                    </div>
                </div>
                <div className="history-container">

                    <h3 className="history-title">History</h3>

                    {data.map((elem) => (
                        <div className="history">
                            <div>{elem.text}</div>
                                <div>{elem.amount} $</div>
                            <div onClick={() => handleDelete(elem)} className="x">x</div>
                        </div>
                    ))}
                </div>
            </div>


        </section>
    );
};
