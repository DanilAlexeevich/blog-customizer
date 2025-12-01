import styles from './ArticleParamsForm.module.scss';

import { useEffect, useRef, useState } from 'react';

import {
	backgroundColors,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	ArticleParamsFormProps,
} from 'src/constants/articleProps';

import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

export const ArticleParamsForm = ({
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(currentState);
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleFormReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset();
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				formRef.current &&
				!formRef.current.contains(event.target as Node) &&
				!(event.target as Element).closest('[data-arrow-button]')
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setIsOpen(!isOpen)}
				data-arrow-button
			/>
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					ref={formRef}
					onSubmit={handleSubmit}
					onReset={handleFormReset}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры{' '}
					</Text>

					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							setFormState({ ...formState, fontFamilyOption: option })
						}
						title={'Шрифт'}
					/>

					<RadioGroup
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState({ ...formState, fontSizeOption: option })
						}
						name='font-size-'
						title={'Размер шрифта'}
					/>

					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) =>
							setFormState({ ...formState, fontColor: option })
						}
						title={'Цвет шрифта'}
					/>

					<Separator></Separator>

					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) =>
							setFormState({ ...formState, backgroundColor: option })
						}
						title={'Цвет фона'}
					/>

					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) =>
							setFormState({ ...formState, contentWidth: option })
						}
						title={'Ширина контента'}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
