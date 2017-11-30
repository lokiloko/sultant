# sultant

### List of transactions CRUD endpoint
https://us-central1-ian-hacktiv8.cloudfunctions.net/transactionsCRUD

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/   |GET    |Ambil semua data transaksi      | |
|/   |POST    |Tambah data transaksi baru      |<ul><li>[x] totalPrice (int)</li><li>[x] user (string) *userId </li><li>[x] items <ul><li>[x] name</li><li>[x] category</li><li>[x] qty</li><li>[x] price</li></ul></li></ul>           |
|/?id=12345   |GET    |Ambil satu data transaksi yg id nya 12345      |               |
|/?action=user&id=abcd   |GET    |Ambil semua data transaksi yg user id nya abcd      |               |
|/?id=1a2b   |DELETE    |Delete transaksi yg id nya 1a2b      |               |
|/?id=12ab   |PUT    |Updata transaksi yg id nya 12ab      |<ul><li>[x] totalPrice (int) </li><li>[x] user (string) *userId </li><li>[x] items <ul><li>[x] name</li><li>[x] category</li><li>[x] qty</li><li>[x] price</li></ul></li></ul>                |

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
