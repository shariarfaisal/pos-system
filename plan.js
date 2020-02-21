

Customer{ id name email password phone district subDistrict createdAt updatedAt }

Employee{ id name username email type password phone createdAt updatedAt }

Vendor{ id name phone imports refund}

Branch{ id name username email address password stocks sales createdAt updatedAt }

Import{ id Vendor Employee Item quantity purchasePrice expense sallingPrice expireDate createdAt updatedAt}

Export{ id Branch Item quantity createdAt updatedAt }

Sale{ id Item quantity Branch createdAt updatedAt }

Category{ id name Products }

Item{ id name Product description Stocks Exports Sales Orders Reviews Refunds ExportReturns createdAt updatedAt }

Product{ id name Category Items createdAt updatedAt }

Order{ id Customer Product quantity deliveryStatus createdAt updatedAt }

Refund{ id Item Vendor quantity createdAt updatedAt }

ExportReturn{ id Item quantity Branch createdAt updatedAt}

// Sales Reporting
// Inventory Management
// Customer Management
// Employee Management
// Billing and order processing
// Sales monitoring and reporting
// Customer relationship and experience
// Loyalty programs and gift cards
