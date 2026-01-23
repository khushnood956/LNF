package com.LNF_project.LNF.service;

import com.LNF_project.LNF.DTO.ItemUpdateDto;
import com.LNF_project.LNF.model.Item;
import com.LNF_project.LNF.repository.ItemRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ItemService {
    private final ItemRepository itemRepository;


    public ItemService(ItemRepository itemRepository){
        this.itemRepository = itemRepository;
    }

    public Item save(Item item){
        return itemRepository.save(item);
    }

    public List<Item> getAll(){
        return itemRepository.findAll();
    }

    public Item getById(Integer id) {
        return itemRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Item Not Found"));
    }

    public void deleteById(Integer id) {
        if(!itemRepository.existsById(id)){
            throw new EntityNotFoundException("Item not found");
        }
        itemRepository.deleteById(id);
    }
@Transactional
    public void updateFound(Integer id) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Item Not Found"));
        item.setFound(true);
        itemRepository.save(item);
    }
//@Transactional
//    public Item updateInfo(Integer id, Map<String, Object> updates) {
//        Item item = itemRepository.findById(id)
//                .orElseThrow(() -> new EntityNotFoundException("Item not found"));
//        Set<String> allowedAttributes = Set.of("itemName","description", "ownerName","contactNo");
//        updates.keySet().retainAll(allowedAttributes);
//        if(updates.containsKey("itemName")) item.setItemName((String) updates.get("itemName"));
//        if(updates.containsKey("description")) item.setDescription((String) updates.get("description"));
//        if(updates.containsKey("ownerName")) item.setOwnerName((String) updates.get("ownerName"));
//        if(updates.containsKey("contactNo")) item.setContactNo((String) updates.get("contactNo"));
//
////        return itemRepository.save(item); // if using transation@ then it can be skipped
//    return item;
//
//    }
@Transactional // to maintain ACID properties
    public Item updateItem(Integer id, ItemUpdateDto dto){
        Item item = itemRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Item not found"));
        if(dto.getItemName()!=null){
            item.setItemName(dto.getItemName());
        }
        if(dto.getDescription()!=null){
            item.setDescription(dto.getDescription());
        }
        if(dto.getOwnerName()!=null){
            item.setOwnerName(dto.getOwnerName());
        }
        if(dto.getContactNo()!=null){
            item.setContactNo(dto.getContactNo());
        }
        return itemRepository.save(item);
    }
}
