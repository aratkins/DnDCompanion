package com.dndcomp.web.rest;

import com.dndcomp.Application;
import com.dndcomp.domain.Character;
import com.dndcomp.repository.CharacterRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the CharacterResource REST controller.
 *
 * @see CharacterResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class CharacterResourceTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_TYPE = "AAAAA";
    private static final String UPDATED_TYPE = "BBBBB";

    @Inject
    private CharacterRepository characterRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restCharacterMockMvc;

    private Character character;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CharacterResource characterResource = new CharacterResource();
        ReflectionTestUtils.setField(characterResource, "characterRepository", characterRepository);
        this.restCharacterMockMvc = MockMvcBuilders.standaloneSetup(characterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        characterRepository.deleteAll();
        character = new Character();
        character.setName(DEFAULT_NAME);
        character.setType(DEFAULT_TYPE);
    }

    @Test
    public void createCharacter() throws Exception {
        int databaseSizeBeforeCreate = characterRepository.findAll().size();

        // Create the Character

        restCharacterMockMvc.perform(post("/api/characters")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(character)))
                .andExpect(status().isCreated());

        // Validate the Character in the database
        List<Character> characters = characterRepository.findAll();
        assertThat(characters).hasSize(databaseSizeBeforeCreate + 1);
        Character testCharacter = characters.get(characters.size() - 1);
        assertThat(testCharacter.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCharacter.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    public void getAllCharacters() throws Exception {
        // Initialize the database
        characterRepository.save(character);

        // Get all the characters
        restCharacterMockMvc.perform(get("/api/characters"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(character.getId())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    public void getCharacter() throws Exception {
        // Initialize the database
        characterRepository.save(character);

        // Get the character
        restCharacterMockMvc.perform(get("/api/characters/{id}", character.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(character.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    public void getNonExistingCharacter() throws Exception {
        // Get the character
        restCharacterMockMvc.perform(get("/api/characters/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    public void updateCharacter() throws Exception {
        // Initialize the database
        characterRepository.save(character);

		int databaseSizeBeforeUpdate = characterRepository.findAll().size();

        // Update the character
        character.setName(UPDATED_NAME);
        character.setType(UPDATED_TYPE);

        restCharacterMockMvc.perform(put("/api/characters")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(character)))
                .andExpect(status().isOk());

        // Validate the Character in the database
        List<Character> characters = characterRepository.findAll();
        assertThat(characters).hasSize(databaseSizeBeforeUpdate);
        Character testCharacter = characters.get(characters.size() - 1);
        assertThat(testCharacter.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCharacter.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    public void deleteCharacter() throws Exception {
        // Initialize the database
        characterRepository.save(character);

		int databaseSizeBeforeDelete = characterRepository.findAll().size();

        // Get the character
        restCharacterMockMvc.perform(delete("/api/characters/{id}", character.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Character> characters = characterRepository.findAll();
        assertThat(characters).hasSize(databaseSizeBeforeDelete - 1);
    }
}
