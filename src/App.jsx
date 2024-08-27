import { useState } from 'react'
import './App.css'

const records = [
  {
    id: 1,
    ad: 'Aysu',
    soyad: 'Aşçı',
    ePosta: 'aysuasci@gmail.com',
    dogumTarihi: '1997.12.13'
  },
  {
    id: 2,
    ad: 'Buse',
    soyad: 'Sakarya',
    ePosta: 'busesakarya@gmail.com',
    dogumTarihi: '1998.07.27'
  },
  {
    id: 3,
    ad: 'Tosun',
    soyad: 'Aşçı',
    ePosta: 'tosuncuk@gmail.com',
    dogumTarihi: '2018.06.13'
  },
  {
    id: 4,
    ad: 'Zeynep',
    soyad: 'Kilim',
    ePosta: 'zeynepkilim@gmail.com',
    dogumTarihi: '1999.08.25'
  },
  {
    id: 5,
    ad: 'Aleyna',
    soyad: 'Ekinci',
    ePosta: 'aleynaekinci@gmail.com',
    dogumTarihi: '1998.07.15'
  },
];

function App() {
  const [data, setData] = useState(records);
  const [isAdd,setAdd] = useState(false);
  function updateRecord(record) {
    let foundRecord = data.find(x => x.id === record.id);
    // referansı bozmamak için object assign kullanıyoruz
    // eğer referansı kırarsak bu sefer gösterim sırası bozulur
    // eğer bu notları çözemezseniz referansı kırıp arayüzde probleme odaklanın
    Object.assign(foundRecord, record);
    setData([...data]);
  }

  function deleteRecord(id) {
    if(!confirm('Emin misiniz?')) { return;}
      setData(data.filter(x => x.id !== id));
      save();
    }
  

  function addRecord(record) {
    setData([...data, { ...record, id: data.length + 1 }]);
    setAdding(false);
  }

  return (
    <div className='container'>
      <h1>Öğrenci Bilgi Sistemi 
      <button onClick={() => setAdd(true)}>Yeni Öğrenci</button>
      </h1>
      {isAdd && <AddStudentForm addRecord={addRecord} />}
      <div className="studentTable">
        <ul className="studentTableTitles">
          <li>Ad</li>
          <li>Soyad</li>
          <li>E-Posta Adresi</li>
          <li>Doğum Tarihi</li>
          <li>#</li>
        </ul>
        {data.map(x => <StudentRow key={x.id} {...x} deleteRecord={deleteRecord} updateRecord={updateRecord} />)}
      </div>
    </div>
  )
}

function StudentRow({ id, ad, soyad, ePosta, dogumTarihi, updateRecord, deleteRecord }) {
  const [isEditing, setEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    formObj.id = id;
    updateRecord(formObj);
    setEditing(false);
  }

  return (
    <form onSubmit={handleSubmit} onDoubleClick={() => setEditing(true)}>
      {isEditing ? 
        <>
          <div className="studentTableCol">
            <input type="text" required name='ad' defaultValue={ad} />
          </div>
          <div className="studentTableCol">
            <input type="text" required name='soyad' defaultValue={soyad} />
          </div>
          <div className="studentTableCol">
            <input type="email" required name='ePosta' defaultValue={ePosta} />
          </div>
          <div className="studentTableCol">
            <input type="date" required name='dogumTarihi' defaultValue={dogumTarihi} />
          </div>
          <div className="studentTableCol">
            <button type='button' onClick={() => setEditing(false)}>vazgeç</button>
            <button className='saveBtn' type='submit'>kaydet</button>
          </div>
        </>
        :
        <>
          <div className="studentTableCol">{ad}</div>
          <div className="studentTableCol">{soyad}</div>
          <div className="studentTableCol">{ePosta}</div>
          <div className="studentTableCol">{dogumTarihi.split('-').reverse().join('.')}</div>
          <div className="studentTableCol">
            <button type='button' onClick={() => setEditing(true)}>düzenle</button>
            <button className='delBtn' type='button' onClick={() => deleteRecord(id)}>sil</button>
          </div>
        </>
      }
    </form> 
  )
}

function AddStudentForm({ addRecord }) {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    addRecord(formObj);
  }

  return (
    <form onSubmit={handleSubmit} className="addStudentForm">
      <div className="studentTableCol">
        <input type="text" name='ad' placeholder='Ad' required />
      </div>
      <div className="studentTableCol">
        <input type="text" name='soyad' placeholder='Soyad' required />
      </div>
      <div className="studentTableCol">
        <input type="email" name='ePosta' placeholder='E-Posta Adresi' required />
      </div>
      <div className="studentTableCol">
        <input type="date" name='dogumTarihi' placeholder='Doğum Tarihi' required />
      </div>
      <div className="studentTableCol">
        <button type='button' onClick={() => setAdd(false)}>vazgeç</button>
        <button className='saveBtn' type='submit'>ekle</button>
      </div>
    </form>
  );
}

export default App;


