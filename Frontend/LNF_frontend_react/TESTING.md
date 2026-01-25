# 🧪 API Integration Testing Guide

This guide helps you test the frontend-backend integration.

## Prerequisites

- Backend Spring Boot API running on `http://localhost:8080`
- Frontend React app running on `http://localhost:3000`

## Quick Backend Health Check

### Test 1: Backend is Running

Open browser: `http://localhost:8080/api/items`

**Expected Response**:
```json
{
  "success": true,
  "message": "Items fetched successfully",
  "data": []
}
```

If you see CORS error or connection refused, backend is not accessible.

## Manual API Testing (with curl/Postman)

### 1. Get All Items
```bash
curl http://localhost:8080/api/items
```

### 2. Create Item
```bash
curl -X POST http://localhost:8080/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "Test Wallet",
    "description": "Black leather wallet found in library",
    "ownerName": "Ahmed Ali",
    "contactNo": "03001234567",
    "found": true
  }'
```

### 3. Get Item by ID
```bash
curl http://localhost:8080/api/items/1
```

### 4. Update Item (PATCH)
```bash
curl -X PATCH http://localhost:8080/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "Updated Wallet Name",
    "found": false
  }'
```

### 5. Delete Item
```bash
curl -X DELETE http://localhost:8080/api/items/1
```

## Frontend Integration Testing

### Test Flow 1: Add Item

1. Open `http://localhost:3000`
2. Click **"+ Add Item"** button
3. Fill form:
   - Item Name: "Samsung Phone"
   - Description: "Black Samsung A52, found in cafeteria"
   - Owner Name: "Ali Hassan"
   - Contact: "03001234567"
   - Check "Mark as Found"
4. Click **"Add Item"**

**Expected**:
- ✅ Success toast appears
- ✅ Redirected to home page
- ✅ New item appears in grid

**Check Browser Console**:
- No errors
- Network tab shows POST to `/api/items` with status 200/201

### Test Flow 2: View All Items

1. Go to home page
2. Observe item cards

**Expected**:
- ✅ Items load from backend
- ✅ Cards show correct data
- ✅ Status badges show "Found" or "Lost"
- ✅ Empty state if no items

### Test Flow 3: Filter Items

1. Add items with mixed statuses (some found, some lost)
2. Click filter tabs:
   - **All**: Shows everything
   - **Found**: Only found items
   - **Lost**: Only lost items

**Expected**:
- ✅ Correct filtering
- ✅ Count badges update
- ✅ No page reload (client-side filter)

### Test Flow 4: View Item Detail

1. Click **"View Details"** on any item card

**Expected**:
- ✅ Navigates to `/item/{id}`
- ✅ Shows all item information
- ✅ Correct status badge
- ✅ Action buttons visible

### Test Flow 5: Mark as Found/Lost

1. On item detail page
2. Click **"Mark as Found"** or **"Mark as Lost"**

**Expected**:
- ✅ Status badge updates immediately
- ✅ Success toast appears
- ✅ Network tab shows PATCH with `{ "found": true/false }`
- ✅ Button text toggles

### Test Flow 6: Edit Item

1. On item detail page
2. Click **"Edit Item"**
3. Modify:
   - Item Name
   - Description
   - Status toggle
4. Click **"Update Item"**

**Expected**:
- ✅ Pre-filled with current values
- ✅ Non-editable fields shown (Owner, Contact)
- ✅ Success toast on update
- ✅ Redirected to detail page
- ✅ Changes reflected immediately
- ✅ **Network tab shows PATCH with ONLY changed fields**

**Critical**: Verify in Network tab that unchanged fields are NOT sent!

### Test Flow 7: Delete Item

1. On item detail page
2. Click **"Delete"**
3. Confirmation modal appears
4. Click **"Delete"** in modal

**Expected**:
- ✅ Confirmation modal appears
- ✅ Can cancel deletion
- ✅ Success toast on delete
- ✅ Redirected to home
- ✅ Item no longer in list
- ✅ Network tab shows DELETE to `/api/items/{id}`

## Error Handling Tests

### Test 1: Backend Offline

1. Stop Spring Boot backend
2. Try to load home page

**Expected**:
- ✅ Error toast: "Failed to fetch items" or "Network error"
- ✅ No crash
- ✅ Empty state shown

### Test 2: Invalid Data

1. Try to add item with:
   - Empty fields
   - Invalid contact number (not 03XXXXXXXXX)

**Expected**:
- ✅ Client-side validation prevents submission
- ✅ Error messages shown under fields
- ✅ No API call made

### Test 3: Item Not Found

1. Navigate manually to `/item/99999` (non-existent ID)

**Expected**:
- ✅ Error toast
- ✅ Redirects to home after 2 seconds
- ✅ No crash

### Test 4: Network Timeout

1. Simulate slow network in DevTools (Throttling)
2. Try operations

**Expected**:
- ✅ Loading spinners show
- ✅ Buttons disabled during operation
- ✅ Eventually times out with error

## Validation Tests

### Contact Number Validation

**Valid**:
- `03001234567` ✅
- `03331234567` ✅
- `03451234567` ✅

**Invalid**:
- `3001234567` ❌ (missing leading 0)
- `030012345` ❌ (too short)
- `030012345678` ❌ (too long)
- `04001234567` ❌ (doesn't start with 03)

### Required Fields

All fields are required:
- Item Name
- Description
- Owner Name
- Contact Number

Status (found) defaults to `false` if unchecked.

## Browser DevTools Checklist

### Network Tab

Check each operation:
- ✅ Correct HTTP method (GET/POST/PATCH/DELETE)
- ✅ Correct endpoint
- ✅ Request payload matches spec
- ✅ Response status 2xx
- ✅ Response format matches `{success, message, data}`

### Console Tab

Should be clean:
- ❌ No errors
- ❌ No warnings (except React devtools)
- ✅ Only expected logs

### Application Tab

Check Local Storage (not used currently, but verify nothing sensitive stored).

## Performance Tests

### 1. Load Time

1. Open DevTools > Network
2. Hard refresh (`Ctrl+Shift+R`)
3. Check:
   - Time to First Byte < 500ms
   - Page fully loaded < 2s

### 2. Bundle Size

After build:
```bash
npm run build
```

Check `dist/assets/`:
- JavaScript bundle < 200KB (gzipped)
- CSS bundle < 50KB (gzipped)

### 3. Lighthouse Audit

1. Open DevTools > Lighthouse
2. Run audit (Desktop + Mobile)

**Target Scores**:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

## Mobile Responsiveness Tests

Test on different screen sizes:
- **Mobile**: 375px (iPhone SE)
- **Tablet**: 768px (iPad)
- **Desktop**: 1920px

**Check**:
- ✅ Layout doesn't break
- ✅ Text is readable
- ✅ Buttons are tappable (min 44px)
- ✅ Form fields have good spacing
- ✅ Sticky add button on mobile only

DevTools: Toggle device toolbar (`Ctrl+Shift+M`)

## Browser Compatibility

Test in:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

**Features to verify**:
- All pages load
- Forms work
- Modals appear correctly
- Transitions smooth

## Common Issues & Fixes

### Issue: CORS Error

**Symptom**: Console shows CORS policy error

**Fix**: Backend must enable CORS for `http://localhost:3000`

```java
@CrossOrigin(origins = "http://localhost:3000")
```

### Issue: 404 on Page Refresh

**Symptom**: Works on first load, but 404 when refreshing `/item/1`

**Fix**: This is a dev server issue. Production requires server configuration (see DEPLOYMENT.md).

### Issue: API Returns 500

**Symptom**: Backend error, frontend shows "Server issue"

**Fix**: Check backend logs for exception. Usually validation or database error.

### Issue: Stale Data

**Symptom**: Changes don't reflect immediately

**Fix**: Verify API returns updated data. Frontend fetches on page load.

## Automated Testing (Future Enhancement)

Consider adding:

### Unit Tests (Jest + React Testing Library)
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### E2E Tests (Playwright/Cypress)
```bash
npm install --save-dev @playwright/test
```

## Test Data Generator

Quick script to populate test data:

```bash
# Add 5 lost items
for i in {1..5}; do
  curl -X POST http://localhost:8080/api/items \
    -H "Content-Type: application/json" \
    -d "{
      \"itemName\": \"Lost Item $i\",
      \"description\": \"Description for item $i\",
      \"ownerName\": \"User $i\",
      \"contactNo\": \"0300123456$i\",
      \"found\": false
    }"
done

# Add 5 found items
for i in {6..10}; do
  curl -X POST http://localhost:8080/api/items \
    -H "Content-Type: application/json" \
    -d "{
      \"itemName\": \"Found Item $i\",
      \"description\": \"Description for item $i\",
      \"ownerName\": \"User $i\",
      \"contactNo\": \"0300123456$i\",
      \"found\": true
    }"
done
```

## Success Criteria

✅ All CRUD operations work
✅ Filtering works correctly
✅ Error handling is graceful
✅ Validations prevent bad data
✅ UI is responsive on all devices
✅ No console errors
✅ Performance metrics met
✅ PATCH sends only changed fields
✅ Confirmation before delete
✅ Toast notifications for all actions

## Final Checklist

Before marking as complete:
- [ ] Backend API accessible
- [ ] All pages load without errors
- [ ] Can add item successfully
- [ ] Can edit item (only changed fields sent)
- [ ] Can delete item (with confirmation)
- [ ] Can toggle found/lost status
- [ ] Filtering works (All/Found/Lost)
- [ ] Mobile layout looks good
- [ ] No console errors
- [ ] Network requests correct
- [ ] Error handling works
- [ ] Validations working
- [ ] Toast notifications appear
- [ ] Loading states show

---

**Ready for demo! 🎉**
