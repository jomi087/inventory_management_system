import { useState } from 'react';

export interface ItemFormState {
  name: string;
  description: string;
  price: string;
  quantity: string;
}

type FormErrors = Partial<Record<keyof ItemFormState, string>>;

interface ItemFormProps {
  initialData?: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  };
  onSubmit: (data: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const ItemForm = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
}: ItemFormProps) => {
  const [form, setForm] = useState<ItemFormState>(
    initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          price: String(initialData.price),
          quantity: String(initialData.quantity),
        }
      : {
          name: '',
          description: '',
          price: '1',
          quantity: '0',
        }
  );

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};
    const name = form.name.trim();
    const description = form.description.trim();
    const price = Number(form.price);
    const quantity = Number(form.quantity);

    if (!name || name.length < 2 || name.length > 100) {
      newErrors.name = 'Name must be between 2 and 100 characters';
    }

    if (
      !description ||
      description.length < 5 ||
      description.length > 200
    ) {
      newErrors.description =
        'Description must be between 5 and 200 characters';
    }

    if (isNaN(quantity) || quantity < 0) {
      newErrors.quantity = 'Quantity must be 0 or more';
    }

    if (isNaN(price) || price < 1) {
      newErrors.price = 'Price must be 1 or more';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    await onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Description"
          value={form.description}
          onChange={e =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          maxLength={100}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="">Quantity</label>
          <input
            type="number"
            className="w-full rounded border px-3 py-2"
            placeholder="Quantity"
            value={form.quantity}
            onChange={e =>
              setForm({
                ...form,
                quantity: e.target.value,
              })
            }
            maxLength={200}
          />
          {errors.quantity && (
            <p className="text-sm text-red-500">{errors.quantity}</p>
          )}
        </div>

        <div>
          <label htmlFor="">Price</label>
          <input
            type="number"
            className="w-full rounded border px-3 py-2"
            placeholder="Price"
            value={form.price}
            onChange={e =>
              setForm({ ...form, price: e.target.value })
            }
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded border px-4 py-2"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default ItemForm;
