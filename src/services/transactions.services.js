import axios from "axios";


class TransactionService {
    fetchTransactions = async (user) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/transactions/user/${user.id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    groupTransactionsByDate = (transactions, currentMonthIndex, currentYear) => {
        if (transactions.length === 0) {
            return [];
        }
        const groupedTransactions = {};
        transactions.forEach(transaction => {
            const date = new Date(transaction.transactionDate);
            const transactionMonth = date.getMonth();
            const transactionYear = date.getFullYear();
            if (transactionMonth === currentMonthIndex && transactionYear === currentYear) {
                const dateString = date.toDateString();
                groupedTransactions[dateString] = groupedTransactions[dateString] || [];
                groupedTransactions[dateString].push(transaction);
            }
        });

        return Object.keys(groupedTransactions).map(dateString => ({
            date: new Date(dateString),
            transactions: groupedTransactions[dateString],
        })).sort((a, b) => b.date - a.date);
    };

    handlePrevNextMonths = (currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, increment) => {
        let newMonthIndex = currentMonthIndex + increment;
        let newYear = currentYear;

        if (newMonthIndex === -1) {
            newMonthIndex = 11; // December
            newYear--;
        } else if (newMonthIndex === 12) {
            newMonthIndex = 0; // January
            newYear++;
        }

        setCurrentMonthIndex(newMonthIndex);
        setCurrentYear(newYear);
    };


    handleCurrentMonth = (setCurrentMonthIndex, setCurrentYear) => {
        setCurrentMonthIndex(new Date().getMonth());
        setCurrentYear(new Date().getFullYear());
    };

    calculateTotalInflow = (transactions) => {
        if (transactions.length === 0) {
            return 0;
        }
        return transactions.reduce((total, transaction) => {
            if (transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT') {
                return total + transaction.amount;
            }
            return total;
        }, 0);
    };

    calculateTotalOutflow = (transactions) => {
        if (transactions.length === 0) {
            return 0;
        }
        return transactions.reduce((total, transaction) => {
            if (transaction.category.type === 'EXPENSE' || transaction.category.type === 'LOAN') {
                return total + transaction.amount;
            }
            return total;
        }, 0);
    };
}

export default new TransactionService();