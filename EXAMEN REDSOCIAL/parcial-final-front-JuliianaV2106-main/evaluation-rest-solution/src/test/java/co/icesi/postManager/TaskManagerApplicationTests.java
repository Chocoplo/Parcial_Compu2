package co.icesi.postManager;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import co.icesi.postManager.dtos.CommentsDto;
import co.icesi.postManager.dtos.LoginDtoOut;
import co.icesi.postManager.dtos.PostDtoOut;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PostManagerApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	private TestRestTemplate restTemplate;

	private String authToken;

	@Test
	void testLoginEndpoint_shouldAuthenticateUser() {
		String loginJson = """
				{
					"username": "jdoe",
					"password": "password"
				}
				""";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<String> request = new HttpEntity<>(loginJson, headers);

		ResponseEntity<LoginDtoOut> response = restTemplate.postForEntity("/login", request, LoginDtoOut.class);

		assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
		assertThat(response.getBody()).isNotEqualTo("Invalid password");
		assertThat(response.getBody()).isNotEqualTo("User not found");
	}

	@BeforeEach
	void obtainAuthToken() {
		String loginJson = """
				{
				    "username": "jdoe",
				    "password": "password"
				}
				""";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<String> request = new HttpEntity<>(loginJson, headers);

		ResponseEntity<LoginDtoOut> response = restTemplate.postForEntity("/login", request, LoginDtoOut.class);
		this.authToken = response.getBody().getToken();
	}

	@Test
	void testLoginEndpoint_shouldHaveValidToken() {
		assertThat(authToken).isNotNull();
		assertThat(authToken).isNotEqualTo("Invalid password");
		assertThat(authToken).isNotEqualTo("User not found");
	}

	private HttpHeaders getAuthHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		if (authToken != null) {
			headers.set("Authorization", "Bearer " + authToken);
		}
		return headers;
	}

	/*
	 * ------------------------------------- REAL TESTS
	 * ------------------------------------------
	 */

	@Test
	void testCreatePost() {
		Map<String, Object> post = new HashMap<>();
		post.put("content", "Test publish");
		post.put("userId", 1L);

		HttpEntity<Map<String, Object>> request = new HttpEntity<>(post, getAuthHeaders());
		ResponseEntity<PostDtoOut> response = restTemplate.postForEntity("/posts", request, PostDtoOut.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
		assertThat(response.getBody()).isNotNull();
		assertThat(response.getBody().getId()).isNotNull();
		assertThat(response.getBody().getContent()).isEqualTo("Test publish");
	}

	@Test
	void testUpdatePost() {
		Map<String, Object> post = new HashMap<>();
		post.put("content", "Test update");
		post.put("userId", 1L);

		HttpEntity<Map<String, Object>> createRequest = new HttpEntity<>(post, getAuthHeaders());
		ResponseEntity<Map> createResponse = restTemplate.postForEntity("/posts", createRequest, Map.class);

		Long postId = Long.valueOf(createResponse.getBody().get("id").toString());

		post.put("content", "Updated Post Content");
		post.put("userId", 2L);
		post.put("id", postId);
		HttpEntity<Map<String, Object>> updateRequest = new HttpEntity<>(post, getAuthHeaders());
		ResponseEntity<PostDtoOut> updateResponse = restTemplate.exchange("/posts", HttpMethod.PUT, updateRequest,
				PostDtoOut.class);

		assertThat(updateResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(updateResponse.getBody()).isNotNull();
		assertThat(updateResponse.getBody().getContent()).isEqualTo("Updated Post Content");
		assertThat(updateResponse.getBody().getUser().getId()).isEqualTo(2L);
	}

	@Test
	void testDeletePost() {
		Map<String, Object> post = new HashMap<>();
		post.put("content", "Test update");
		post.put("userId", 1L);
		HttpEntity<Map<String, Object>> createRequest = new HttpEntity<>(post, getAuthHeaders());
		ResponseEntity<Map> createResponse = restTemplate.postForEntity("/posts", createRequest, Map.class);

		Long postId = Long.valueOf(createResponse.getBody().get("id").toString());

		HttpEntity<Void> deleteRequest = new HttpEntity<>(getAuthHeaders());
		ResponseEntity<Void> deleteResponse = restTemplate.exchange("/posts/" + postId, HttpMethod.DELETE,
				deleteRequest, Void.class);

		assertThat(deleteResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

		ResponseEntity<Map> getResponse = restTemplate.exchange("/posts/" + postId, HttpMethod.GET, deleteRequest,
				Map.class);
		assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
	}

	@Test
	void testGetAllPosts() {
		HttpEntity<Void> request = new HttpEntity<>(getAuthHeaders());
		ResponseEntity<Map[]> response = restTemplate.exchange("/posts", HttpMethod.GET, request, Map[].class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(response.getBody()).isNotNull();
	}

	@Test
	void testCreatePost_WithUser() {

		String loginJson = """
				{
				    "username": "asmith",
				    "password": "password"
				}
				""";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<String> request = new HttpEntity<>(loginJson, headers);

		ResponseEntity<LoginDtoOut> response = restTemplate.postForEntity("/login", request, LoginDtoOut.class);
		String authTokenAlice = response.getBody().getToken();

		System.out.println(authTokenAlice);

		HttpHeaders headersRequest = new HttpHeaders();
		headersRequest.setContentType(MediaType.APPLICATION_JSON);
		if (authTokenAlice != null) {
			headersRequest.set("Authorization", "Bearer " + authTokenAlice);
		}

		Map<String, Object> post = new HashMap<>();
		post.put("content", "Test update");
		post.put("userId", 1L);

		HttpEntity<Map<String, Object>> requestCreatePost = new HttpEntity<>(post, headersRequest);
		ResponseEntity<Map> responseCreatePost = restTemplate.postForEntity("/posts", requestCreatePost, Map.class);

		assertThat(responseCreatePost.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
	}

	@Test
	void addCommentTest() {
		Map<String, Object> post = new HashMap<>();
		post.put("content", "Test publish");
		post.put("userId", 1L);

		HttpEntity<Map<String, Object>> request = new HttpEntity<>(post, getAuthHeaders());
		ResponseEntity<PostDtoOut> response = restTemplate.postForEntity("/posts", request, PostDtoOut.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
		assertThat(response.getBody()).isNotNull();
		assertThat(response.getBody().getId()).isNotNull();
		Long postId = response.getBody().getId();
		Map<String, Object> comment = new HashMap<>();
		comment.put("content", "Test comment");
		comment.put("userId", 1L);
		comment.put("postId", postId);

		HttpEntity<Map<String, Object>> requestComment = new HttpEntity<>(comment, getAuthHeaders());
		ResponseEntity<CommentsDto> responseComment = restTemplate.postForEntity("/posts/" + postId + "/comments",
				requestComment, CommentsDto.class);
		assertThat(responseComment.getStatusCode()).isEqualTo(HttpStatus.CREATED);
		assertThat(responseComment.getBody()).isNotNull();
		assertThat(responseComment.getBody().getContent()).isEqualTo("Test comment");
		assertThat(responseComment.getBody().getPostId()).isEqualTo(postId);
		assertThat(responseComment.getBody().getUser().getId()).isEqualTo(1L);

		HttpEntity<Void> getRe = new HttpEntity<>(getAuthHeaders());

		ResponseEntity<PostDtoOut> getResponse = restTemplate.exchange("/posts/" + postId, HttpMethod.GET, getRe, PostDtoOut.class);
		assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(getResponse.getBody()).isNotNull();
		assertThat(getResponse.getBody().getCommentsCount()).isEqualTo(1);

	}

}
