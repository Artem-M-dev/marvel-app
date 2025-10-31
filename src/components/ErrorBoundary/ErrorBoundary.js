import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component { // Это как раз тот компонент который будет ловить ошибку 
    state = {
        error: false
    };

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) { // Если ошибка есть
            return <ErrorMessage/>
        }

        // Но если ошибки нет
        return (
            this.props.children // Эту конструкцию мы пройдем позже на уроках
        )
    }
}

export default ErrorBoundary