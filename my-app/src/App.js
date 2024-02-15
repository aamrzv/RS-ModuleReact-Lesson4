import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
	email: yup.string().email('Некорректный адрес электронной почты').required('Обязательное поле'),
	password: yup.string().min(6, 'Пароль должен содержать не менее 6 символов').required('Обязательное поле'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
		.required('Обязательное поле'),
});

export const App = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'all',
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (data) => {
		console.log('Данные формы:', data);
	};

	return (
		<div className="App">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label>Email:</label>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<>
								<input type="text" {...field} />
								{errors.email && <span>{errors.email.message}</span>}
							</>
						)}
					/>
				</div>
				<div>
					<label>Пароль:</label>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<>
								<input type="password" {...field} />
								{errors.password && <span>{errors.password.message}</span>}
							</>
						)}
					/>
				</div>
				<div>
					<label>Повтор пароля:</label>
					<Controller
						name="confirmPassword"
						control={control}
						render={({ field }) => (
							<>
								<input type="password" {...field} />
								{errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
							</>
						)}
					/>
				</div>
				<button type="submit" disabled={!isValid}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
