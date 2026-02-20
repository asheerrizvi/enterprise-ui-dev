import { fireEvent, screen } from '@testing-library/react';
import { render } from 'test/utilities';
import ObstacleCourse from '.';

it('should input text into the input field', async () => {
  const { user } = render(<ObstacleCourse />);
  const thought = 'Ravioli are a form of pop tart.';
  const input = screen.getByTestId<HTMLInputElement>('text-input');
  await user.type(input, thought);
  expect(input).toHaveValue(thought);
});

it('should control a select input', async () => {
  const { user } = render(<ObstacleCourse />);
  const select = screen.getByTestId<HTMLSelectElement>('select-input');
  await user.selectOptions(select, 'Thor');
  expect(select).toHaveValue('Thor');
});

it('should find and control a checkbox input', async () => {
  const { user } = render(<ObstacleCourse />);
  const checkbox = screen.getByTestId<HTMLInputElement>('checkbox-onion');
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
});

it('should find and control a radio input', async () => {
  const { user } = render(<ObstacleCourse />);
  const radio = screen.getByTestId<HTMLInputElement>('radio-john');
  await user.click(radio);
  expect(radio).toBeChecked();
});

it('should find and control a color input', () => {
  render(<ObstacleCourse />);
  const input = screen.getByTestId<HTMLInputElement>('color-input');
  fireEvent.input(input, { target: { value: '#33cc99' } });
  expect(input).toHaveValue('#33cc99');
});

it('should find and control a date input', () => {
  render(<ObstacleCourse />);
  const input = screen.getByTestId<HTMLInputElement>('date-input');
  fireEvent.input(input, { target: { value: '2022-01-01' } });
  expect(input).toHaveValue('2022-01-01');
});

it('should find and control a range input', () => {
  render(<ObstacleCourse />);
  const input = screen.getByTestId<HTMLInputElement>('range-input');
  fireEvent.input(input, { target: { value: '7' } });
  expect(input).toHaveValue('7');
});

it('should find and control a file input', async () => {
  const { user } = render(<ObstacleCourse />);
  const input = screen.getByTestId<HTMLInputElement>('file-input');
  const file = new File(['hello'], 'resume.pdf', { type: 'application/pdf' });
  await user.upload(input, file);
  expect(input.files).toHaveLength(1);
  expect(input.files).toHaveLength(1);
  expect(input.files?.[0].name).toBe('resume.pdf');
  expect(input.files?.[0].type).toBe('application/pdf');
  expect(input.files?.[0]).toStrictEqual(file);
});
