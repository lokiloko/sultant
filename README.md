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
link coming soon

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|

### List of users CRUD endpoint
https://us-central1-ian-hacktiv8.cloudfunctions.net/usersCRUD

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/   |GET    |Ambil semua data user      | |
|/   |POST    |Register data user baru     | <ul><li>[x] nik (string)</li><li>[x] nama (string)</li><li>[x] tempatLahir (string)</li><li>[x] tanggalLahir (string)</li><li>[x] alamat (string)</li><li>[x] rtRw (string)</li><li>[x] kelurahan (string)</li><li>[x] agama (string)</li><li>[x] status (string)</li><li>[x] pekerjaan (string)</li><li>[x] kewarganegaraan (string)</li><li>[x] berlaku (string)</li><li>[x] golonganDarah (string)</li><li>[x] jenisKelamin (string)</li></ul> |
|/?id=1234   |GET    |Ambil satu data user yg id nya 1234    | |
|/?id=abcd   |PUT    |Update satu data user yg id nya abcd    |<ul><li>[ ] nik (string)</li><li>[ ] nama (string)</li><li>[ ] tempatLahir (string)</li><li>[ ] tanggalLahir (string)</li><li>[ ] alamat (string)</li><li>[ ] rtRw (string)</li><li>[ ] kelurahan (string)</li><li>[ ] agama (string)</li><li>[ ] status (string)</li><li>[ ] pekerjaan (string)</li><li>[ ] kewarganegaraan (string)</li><li>[ ] berlaku (string)</li><li>[ ] golonganDarah (string)</li><li>[ ] jenisKelamin (string)</li></ul> |
|/?id=1b2c   |DELETE    |Delete satu data user yg id nya 1b2c    | |

### List of label harga OCR endpoint
https://us-central1-ian-hacktiv8.cloudfunctions.net/ocrGoogleVision

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/   |POST    |Ambil data hasil baca label harga      |<ul><li>[x] imageUri (string) </li> |
  
### List of ktp OCR endpoint

link coming soon

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/   |POST    |Ambil data hasil baca ktp      |<ul><li>[x] imageUri (string) </li> |
