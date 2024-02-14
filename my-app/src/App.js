import { useState } from 'react';

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({});
	const [isFormValid, setIsFormValid] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
		validateField(name, value);
	};

	const validateField = (fieldName, value) => {
		const newErrors = { ...errors };

		switch (fieldName) {
			case 'email':
				newErrors.email = /\S+@\S+\.\S+/.test(value) ? '' : 'Некорректный адрес электронной почты';
				break;
			case 'password':
				newErrors.password = value.length >= 6 ? '' : 'Пароль должен содержать не менее 6 символов';
				break;
			case 'confirmPassword':
				newErrors.confirmPassword = value === formData.password ? '' : 'Пароли не совпадают';
				break;
			default:
				break;
		}

		setErrors(newErrors);
		validateForm(newErrors);
	};

	const validateForm = (newErrors) => {
		const isValid = Object.values(newErrors).every((error) => error === '') && Object.values(formData).every((value) => value !== '');
		setIsFormValid(isValid);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isFormValid) {
			console.log('Данные формы:', formData);
		} else {
			console.log('Форма содержит ошибки');
		}
	};

	return (
		<div className="App">
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input type="text" name="email" value={formData.email} onChange={handleChange} />
					{errors.email && <span>{errors.email}</span>}
				</div>
				<div>
					<label>Пароль:</label>
					<input type="password" name="password" value={formData.password} onChange={handleChange} />
					{errors.password && <span>{errors.password}</span>}
				</div>
				<div>
					<label>Повтор пароля:</label>
					<input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
					{errors.confirmPassword && <span>{errors.confirmPassword}</span>}
				</div>
				<button type="submit" disabled={!isFormValid}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
