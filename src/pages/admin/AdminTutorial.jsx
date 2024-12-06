import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar'; // Pastikan path sesuai
import './AdminTutorial.css';

const AdminTutorial = () => {
  const [tutorials, setTutorials] = useState([
    {
      title: 'Pot tanaman dari galon bekas',
      wasteType: 'Plastik',
      description:
        'Pot tanaman dari galon bekas merupakan cara kreatif untuk mendaur ulang sampah plastik sekaligus memberikan tempat tumbuh yang ramah lingkungan bagi tanaman. Dengan memotong, menghias, dan mengisi botol dengan tanah, kita dapat menciptakan pot yang unik dan menarik, serta berkontribusi pada pengurangan limbah plastik di lingkungan sekitar kita...'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    wasteType: '',
    description: '',
    image: '',
    videoLink: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTutorials([...tutorials, { ...formData }]);
    setFormData({ title: '', wasteType: '', description: '', image: '', videoLink: '' });
  };

  return (
    <div className="admin-page">
      {/* Sidebar di sini */}
      <Sidebar />

      <div className="admin-tutorial">
        <h2>Tambah Tutorial</h2>
        <form onSubmit={handleFormSubmit} className="form-container">
          <label>
            Judul Tutorial
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Masukkan Judul Tutorial"
              required
            />
          </label>

          <label>
            Jenis Sampah
            <select name="wasteType" value={formData.wasteType} onChange={handleInputChange} required>
              <option value="">Pilih Salah Satu</option>
              <option value="Plastik">Plastik</option>
              <option value="Kertas">Kertas</option>
              <option value="Logam">Logam</option>
            </select>
          </label>

          <label>
            Deskripsi
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Masukkan Deskripsi"
              required
            />
          </label>

          <label>
            Gambar
            <input type="file" onChange={handleFileChange} />
          </label>

          <label>
            Link Video
            <input
              type="url"
              name="videoLink"
              value={formData.videoLink}
              onChange={handleInputChange}
              placeholder="Masukkan Link Video"
            />
          </label>

          <button type="submit">Upload</button>
        </form>

        <h2>Daftar Tutorial</h2>
        <div className="tutorial-list">
          <table>
            <thead>
              <tr>
                <th>Judul Tutorial</th>
                <th>Jenis Sampah</th>
                <th>Deskripsi</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((tutorial, index) => (
                <tr key={index}>
                  <td>{tutorial.title}</td>
                  <td>{tutorial.wasteType}</td>
                  <td>{tutorial.description}</td>
                  <td>
                    <button className="edit-button">✏️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTutorial;
