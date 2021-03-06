# sultant

### List of transactions CRUD endpoint
https://us-central1-ian-hacktiv8.cloudfunctions.net/transactionsCRUD

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/   |GET    |Ambil semua data transaksi      | |
|/   |POST    |Tambah data transaksi baru      |<ul><li>[x] totalPrice (int)</li><li>[x] user (string) *userId </li><li>[x] items (Array of Objects) <ul><li>[x] name</li><li>[x] category</li><li>[x] qty</li><li>[x] price</li></ul></li></ul>           |
|/?id=12345   |GET    |Ambil satu data transaksi yg id nya 12345      |               |
|/?action=user&id=abcd   |GET    |Ambil semua data transaksi yg user id nya abcd      |               |
|/?id=1a2b   |DELETE    |Delete transaksi yg id nya 1a2b      |               |
|/?id=12ab   |PUT    |Updata transaksi yg id nya 12ab      |<ul><li>[ ] totalPrice (int) </li><li>[ ] user (string) *userId </li><li>[ ] items (Array of Objects) <ul><li>[x] name</li><li>[x] category</li><li>[x] qty</li><li>[x] price</li></ul></li></ul>                |

### List of category endpoint
link coming soon

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|

### List of suggestion endpoint
https://us-central1-pure-faculty-187614.cloudfunctions.net/shopSuggestion

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/   |GET    |Ambil list kategori      | |
|/   |POST    |Cek transaksi untuk mendapatkan saran      |<ul><li>[x] priority (Array of String) </li><li>[x] items (Array of Objects) <ul><li>[x] name</li><li>[x] category</li><li>[x] qty</li><li>[x] price</li></ul></li></ul>           |

### List of users CRUD endpoint
https://us-central1-ian-hacktiv8.cloudfunctions.net/usersCRUD

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/   |GET    |Ambil semua data user      | |
|/   |POST    |Register data user baru     | <ul><li>[x] nik (string)</li><li>[x] nama (string)</li><li>[x] jenisKelamin (string)</li><li>[x] provinsi (string)</li><li>[x] kota (string)</li><li>[x] agama</li><li>[x] status</li><li>[x] tempatLahir</li><li>[x] tanggalLahir</li></ul> |
|/?id=1234   |GET    |Ambil satu data user yg id nya 1234    | |
|/?id=abcd   |PUT    |Update satu data user yg id nya abcd    |<ul><li>[ ] nik (string)</li><li>[ ] nama (string)</li><li>[ ] jenisKelamin (string)</li><li>[ ] provinsi (string)</li><li>[ ] kota (string)</li><li>[ ] agama</li><li>[ ] status</li><li>[ ] tempatLahir</li><li>[ ] tanggalLahir</li></ul> |
|/?id=1b2c   |DELETE    |Delete satu data user yg id nya 1b2c    | |

### List of label harga OCR endpoint
https://us-central1-ian-hacktiv8.cloudfunctions.net/ocrGoogleVision

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/   |POST    |Ambil data hasil baca label harga      |<ul><li>[x] imageUri (string) </li> |
* pola image yg support <br/>
  <li>[x] https://4.bp.blogspot.com/-ecUgQIyl70I/VsgZiAi-Y-I/AAAAAAAAFw0/khnNucRAEjI/s1600/chitato%2Bmi%2Bgoreng.jpg</li>
  <li>[x] https://assets-a1.kompasiana.com/statics/files/1425885036301936272.jpg</li>
  
### List of ktp OCR endpoint

https://us-central1-ian-hacktiv8.cloudfunctions.net/ocrKtp

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/   |POST    |Ambil data hasil baca ktp      |<ul><li>[x] imageUri (string) </li> |
