package ca2re.backend.persistencia.mongo;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;

import ca2re.backend.persistencia.UsuarioDAO;

public class UsuarioMongoDAO implements UsuarioDAO{

private static final String COLLECTION_USUARIO = "usuario";
	
	@Autowired
	private static MongoOperations mongoOperations;

	public UsuarioMongoDAO(MongoOperations mongoOperations) {
		super();
		this.mongoOperations = mongoOperations;
	}
	
	@Override
	public boolean esPermitidoElUsuario(String idUsuario) {
		Query usuario = query(where("idUsuario").is(idUsuario));
		return mongoOperations.exists(usuario, COLLECTION_USUARIO);
	}
}
