package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Orders;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Orders}.
 */
public interface OrdersService {

    /**
     * Save a orders.
     *
     * @param orders the entity to save.
     * @return the persisted entity.
     */
    Orders save(Orders orders);

    /**
     * Get all the orders.
     *
     * @return the list of entities.
     */
    List<Orders> findAll();


    /**
     * Get the "id" orders.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Orders> findOne(Long id);

    /**
     * Delete the "id" orders.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
