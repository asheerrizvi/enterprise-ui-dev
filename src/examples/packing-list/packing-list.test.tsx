import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { render as baseRender, screen } from 'test/utilities';
import { PackingList } from '.';
import { createStore } from './store';

const render: typeof baseRender = (Component, options) => {
  const store = createStore();

  const Wrapper = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return baseRender(Component, { ...options, wrapper: Wrapper });
};

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByRole('searchbox', {
    name: /new item name/i,
  });
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const newItemInput = screen.getByRole('searchbox', {
    name: /new item name/i,
  });
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });
  expect(newItemInput).toHaveValue('');
  expect(addNewItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByRole('searchbox', {
    name: /new item name/i,
  });
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });
  expect(addNewItemButton).toBeDisabled();
  await user.type(newItemInput, 'Laptop');
  expect(addNewItemButton).not.toBeDisabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByRole('searchbox', {
    name: /new item name/i,
  });
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });
  await user.type(newItemInput, 'Laptop');
  await user.click(addNewItemButton);
  expect(screen.getByLabelText('Laptop')).not.toBeChecked();
});

it('clears the input field after adding a new item', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByRole('searchbox', {
    name: /new item name/i,
  });
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });
  await user.type(newItemInput, 'Laptop');
  await user.click(addNewItemButton);
  expect(newItemInput).toHaveValue('');
});

it('removes an item from the list when clicking the "Remove" button', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByRole('searchbox', {
    name: /new item name/i,
  });
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });
  await user.type(newItemInput, 'Laptop');
  await user.click(addNewItemButton);
  const removeButton = screen.getByLabelText(/remove laptop/i);
  await user.click(removeButton);
  expect(removeButton).not.toBeInTheDocument();
});
