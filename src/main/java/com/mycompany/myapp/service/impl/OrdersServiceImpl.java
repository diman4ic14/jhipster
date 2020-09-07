package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.OrdersService;
import com.mycompany.myapp.domain.Orders;
import com.mycompany.myapp.repository.OrdersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Orders}.
 */
@Service
@Transactional
public class OrdersServiceImpl implements OrdersService {

    private final Logger log = LoggerFactory.getLogger(OrdersServiceImpl.class);

    private final OrdersRepository ordersRepository;

    public OrdersServiceImpl(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    @Override
    public Orders save(Orders orders) {
        log.debug("Request to save Orders : {}", orders);
        return ordersRepository.save(orders);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Orders> findAll() {
        log.debug("Request to get all Orders");
        return ordersRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Orders> findOne(Long id) {
        log.debug("Request to get Orders : {}", id);
        return ordersRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Orders : {}", id);
        ordersRepository.deleteById(id);
    }
}
