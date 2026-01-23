import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import Modal from '../components/modal/Modal';
import Pagination from '../components/pagination/Pagination';
import AuthService from '../services/AuthService';
import ItemForm from '../components/items/ItemForm';
import { SearchInput } from '../components/input/SearchInput';
import type {
  CreateItemPayload,
  UpdateItemPayload,
} from '../types/item';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await AuthService.getItems(
        debouncedSearch,
        page,
        limit
      );
      setItems(res.data.items);
      setTotal(res.data.total);
    } catch (error) {
      let errorMsg = 'Failed to fetch items';

      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || errorMsg;
      }

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [debouncedSearch, page]);

  const handleCreate = async (data: CreateItemPayload) => {
    try {
      setFormLoading(true);
      const res = await AuthService.createItem(data);
      setItems(prevItems => [...prevItems, res.data.items]);

      toast.success('Item created');
      setShowModal(false);

      // fetchItems();
    } catch (error) {
      let errorMsg = 'Failed to create item';
      if (axios.isAxiosError(error)) {
        // backend error message
        errorMsg = error.response?.data?.message || errorMsg;
      }
      toast.error(errorMsg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data: UpdateItemPayload) => {
    if (!editingItem) return;
    try {
      setFormLoading(true);
      const res = await AuthService.updateItem(editingItem.id, data);
      toast.success('Item updated');
      setShowModal(false);
      setEditingItem(null);
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === editingItem.id ? res.data.item : item
        )
      );
    } catch (error) {
      let errorMsg = 'Failed to update item';
      if (axios.isAxiosError(error)) {
        // backend error message
        errorMsg = error.response?.data?.message || errorMsg;
      }
      toast.error(errorMsg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (Itemid: string) => {
    if (!Itemid) return;
    try {
      await AuthService.deleteItem(Itemid);
      setItems(prevItems =>
        prevItems.filter(item => item.id != Itemid)
      );

      toast.success('Item Deleted');
    } catch (error) {
      let errorMsg = 'Failed to delete item';
      if (axios.isAxiosError(error)) {
        // backend error message
        errorMsg =
          error.response?.data?.message || errorMsg;
      }
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-6xl rounded-xl bg-white p-6 shadow">
        <h2 className="text-2xl font-bold underline">
          Inventory Items
        </h2>
        <div className="mb-6 flex items-center justify-between">
          <nav className="text-primary/80 px-6 pt-4 text-sm">
            <ol className="flex flex-wrap items-center space-x-2">
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>/</li>
              <li className="font-semibold">items</li>
            </ol>
          </nav>
          <button
            onClick={() => {
              setEditingItem(null);
              setShowModal(true);
            }}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            + Add Item
          </button>
        </div>

        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search items..."
        />

        {loading && (
          <div className="py-10 text-center">Loading...</div>
        )}

        {!loading && items.length === 0 && (
          <div className="py-10 text-center">No items found</div>
        )}

        {!loading && items.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-22 px-4 py-2 text-left">
                      Sr.No
                    </th>
                    <th className="px-4 py-2 text-center">Name</th>
                    <th className="px-4 py-2 text-center">
                      Description
                    </th>
                    <th className="px-4 py-2 text-center">Qty</th>
                    <th className="px-4 py-2 text-center">Price</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={item.id}>
                      <td className="w-22 px-4 py-2 text-left">
                        {i + 1}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {item.name.toUpperCase()}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {item.description.toUpperCase()}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-2 text-center">
                        ₹{item.price}
                      </td>
                      <td className="w-48 space-x-2 px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setShowModal(true);
                          }}
                          className="rounded bg-yellow-500 px-3 py-1 text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded bg-red-500 px-3 py-1 text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              page={page}
              setPage={setPage}
              limit={limit}
              total={total}
            />
          </>
        )}
      </div>

      {showModal && (
        <Modal>
          <h3 className="mb-4 text-lg font-semibold">
            {editingItem ? 'Edit Item' : 'Add Item'}
          </h3>

          <ItemForm
            initialData={editingItem || undefined}
            loading={formLoading}
            onCancel={() => setShowModal(false)}
            onSubmit={editingItem ? handleUpdate : handleCreate}
          />
        </Modal>
      )}
    </div>
  );
};

export default Items;
